import { useState, useEffect } from 'react';
import paymentAPI from '@/services/paymentAPI';
import toast from 'react-hot-toast';

const useRazorpay = () => {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load Razorpay configuration
  useEffect(() => {
    const loadConfig = async () => {
      try {
        // First try to get config from backend
        const response = await paymentAPI.getRazorpayConfig();
        if (response.data.success) {
          setConfig(response.data.data);
          return;
        }
      } catch (err) {
        console.warn('Backend config failed, using environment config:', err.message);
      }

      // Use real Razorpay test keys
      const envKeyId = import.meta.env.VITE_RAZORPAY_KEY_ID;
      if (envKeyId && envKeyId !== 'rzp_test_your_test_key_here' && envKeyId !== 'rzp_test_your_actual_test_key_here') {
        console.log('💳 Using real Razorpay test keys:', envKeyId);
        setConfig({
          keyId: envKeyId,
          currency: 'INR',
          name: 'Organic Hub',
          description: 'Organic products payment',
          theme: {
            color: '#16a34a'
          }
        });
      } else {
        // Fallback to demo only if no keys configured
        console.log('🧪 No Razorpay keys found, using demo mode');
        setConfig({
          keyId: 'rzp_test_demo123',
          currency: 'INR',
          name: 'Organic Hub',
          description: 'Organic products payment (Demo Mode)',
          theme: {
            color: '#16a34a'
          }
        });
      }
    };

    loadConfig();
  }, []);

  // Initialize Razorpay payment
  const initializePayment = async (orderData, onSuccess, onFailure) => {
    if (!config) {
      console.error('❌ Payment service not configured')
      toast.error('Payment service not configured');
      return false;
    }

    console.log('🚀 Initializing payment with config:', config)
    console.log('📦 Order data:', orderData)

    setLoading(true);
    setError(null);

    try {
      // Create Razorpay order
      console.log('💳 Creating Razorpay order...')
      const orderResponse = await paymentAPI.createRazorpayOrder(
        orderData.amount,
        'INR'
      );

      console.log('📋 Razorpay order response:', orderResponse)

      if (!orderResponse.data.success) {
        throw new Error(orderResponse.data.message || 'Failed to create payment order');
      }

      const razorpayOrder = orderResponse.data.data;

      // Check if we're using real Razorpay keys
      const isRealRazorpay = config.keyId && !config.keyId.includes('demo');

      if (isRealRazorpay) {
        console.log('💳 Real Razorpay integration...')
        
        // Real Razorpay integration
        const options = {
          key: config.keyId,
          amount: razorpayOrder.amount,
          currency: razorpayOrder.currency,
          name: config.name,
          description: config.description,
          order_id: razorpayOrder.orderId,
          handler: async (response) => {
            try {
              console.log('🔐 Payment response received:', response)
              // Verify payment
              const verifyResponse = await paymentAPI.verifyPayment({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderId: orderData.orderId
              });

              if (verifyResponse.data.success) {
                console.log('✅ Payment verified successfully')
                toast.success('Payment successful!');
                onSuccess(response);
              } else {
                throw new Error(verifyResponse.data.message || 'Payment verification failed');
              }
            } catch (verifyError) {
              console.error('❌ Payment verification error:', verifyError);
              toast.error('Payment verification failed');
              onFailure(verifyError);
            }
          },
          prefill: {
            name: orderData.customerName || '',
            email: orderData.customerEmail || '',
            contact: orderData.customerPhone || ''
          },
          theme: config.theme,
          modal: {
            ondismiss: () => {
              console.log('❌ Payment modal dismissed')
              setLoading(false);
              onFailure(new Error('Payment cancelled'));
            }
          }
        };

        // Load Razorpay script if not already loaded
        if (!window.Razorpay) {
          const script = document.createElement('script');
          script.src = 'https://checkout.razorpay.com/v1/checkout.js';
          script.async = true;
          script.onload = () => {
            try {
              const razorpay = new window.Razorpay(options);
              razorpay.open();
            } catch (razorpayError) {
              console.error('❌ Razorpay initialization error:', razorpayError);
              toast.error('Failed to initialize payment. Please try again.');
              onFailure(razorpayError);
            }
          };
          script.onerror = () => {
            console.error('❌ Failed to load Razorpay script');
            toast.error('Failed to load payment system. Please try again.');
            onFailure(new Error('Failed to load payment system'));
          };
          document.body.appendChild(script);
        } else {
          try {
            const razorpay = new window.Razorpay(options);
            razorpay.open();
          } catch (razorpayError) {
            console.error('❌ Razorpay initialization error:', razorpayError);
            toast.error('Failed to initialize payment. Please try again.');
            onFailure(razorpayError);
          }
        }
      } else {
        // Demo mode fallback
        console.log('🧪 Demo mode - simulating payment...')
        toast.success('🧪 Demo Mode: Simulating payment...', { duration: 3000 });
        
        setTimeout(() => {
          const demoResponse = {
            razorpay_order_id: razorpayOrder.orderId,
            razorpay_payment_id: 'demo_payment_' + Date.now(),
            razorpay_signature: 'demo_signature_' + Math.random().toString(36).substr(2, 9)
          }
          console.log('✅ Demo payment completed:', demoResponse)
          toast.success('✅ Demo payment successful! This is a test transaction.', { duration: 3000 });
          onSuccess(demoResponse);
        }, 3000);
      }

      return true;

    } catch (err) {
      console.error('Payment initialization error:', err);
      setError(err.message);
      toast.error(err.message || 'Failed to initialize payment');
      onFailure(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Check if Razorpay is available
  const isAvailable = () => {
    return config !== null && !error;
  };

  // Check if we're in demo mode
  const isDemoMode = () => {
    return config?.keyId?.includes('demo') || !config?.keyId;
  };

  return {
    config,
    loading,
    error,
    isAvailable,
    isDemoMode,
    initializePayment
  };
};

export default useRazorpay;
