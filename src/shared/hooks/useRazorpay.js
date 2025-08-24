import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const useRazorpay = () => {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load Razorpay configuration
  useEffect(() => {
    const loadConfig = async () => {
      try {
        // Use a reliable test key
        const razorpayKey = 'rzp_test_1DP5mmOlF5G5ag';
        
        console.log('💳 Loading Razorpay configuration with key:', razorpayKey);
        
        setConfig({
          keyId: razorpayKey,
          currency: 'INR',
          name: 'Organic Hub',
          description: 'Fresh Organic Products',
          theme: {
            color: '#16a34a'
          }
        });
        
        console.log('✅ Razorpay configuration loaded successfully');
      } catch (err) {
        console.error('❌ Failed to load Razorpay config:', err);
        setError('Failed to load payment configuration');
      }
    };

    loadConfig();
  }, []);

  // Load Razorpay script
  useEffect(() => {
    if (config && !window.Razorpay) {
      console.log('📜 Loading Razorpay script...');
      
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      
      script.onload = () => {
        console.log('✅ Razorpay script loaded successfully');
      };
      
      script.onerror = () => {
        console.error('❌ Failed to load Razorpay script');
        setError('Failed to load payment system');
      };
      
      document.body.appendChild(script);
    }
  }, [config]);

  // Create a proper order ID for Razorpay
  const createOrderId = () => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 15);
    return `order_${timestamp}_${random}`;
  };

  // Initialize Razorpay payment
  const initializePayment = async (orderData, onSuccess, onFailure) => {
    console.log('🚀 Starting payment initialization...');
    console.log('📦 Order data received:', orderData);
    
    if (!config) {
      console.error('❌ Payment service not configured');
      toast.error('Payment service not configured');
      return false;
    }

    if (!window.Razorpay) {
      console.error('❌ Razorpay script not loaded');
      toast.error('Payment system not ready. Please refresh and try again.');
      return false;
    }

    // Validate order data
    if (!orderData || !orderData.amount || orderData.amount <= 0) {
      console.error('❌ Invalid order data:', orderData);
      toast.error('Invalid order data');
      return false;
    }

    console.log('✅ All checks passed, proceeding with payment...');
    console.log('🔑 Using Razorpay key:', config.keyId);

    setLoading(true);
    setError(null);

    try {
      // Convert amount to paise
      const amount = Math.round(parseFloat(orderData.amount) * 100);
      
      console.log('💰 Amount in paise:', amount);
      console.log('💰 Original amount:', orderData.amount);

      // Validate amount
      if (amount <= 0 || isNaN(amount)) {
        throw new Error('Invalid amount for payment');
      }

      // Create payment options (simplified for testing)
      const options = {
        key: config.keyId,
        amount: amount,
        currency: 'INR',
        name: config.name,
        description: config.description,
        
        // Customer details
        prefill: {
          name: orderData.customerName || 'Test User',
          email: orderData.customerEmail || 'test@example.com',
          contact: orderData.customerPhone || '9999999999'
        },
        
        // Theme
        theme: {
          color: '#16a34a'
        },
        
        // Modal settings
        modal: {
          ondismiss: () => {
            console.log('❌ Payment modal dismissed');
            setLoading(false);
            toast.error('Payment cancelled');
            onFailure(new Error('Payment cancelled'));
          },
          confirm_close: true,
          escape: false
        },
        
        // Payment handler
        handler: (response) => {
          console.log('🔐 Payment successful:', response);
          setLoading(false);
          toast.success('Payment successful!');
          
          // Add the order data to the response
          const paymentResponse = {
            ...response,
            amount: amount,
            originalOrderData: orderData
          };
          
          onSuccess(paymentResponse);
        },
        
        // Notes
        notes: {
          address: 'Organic Hub - Fresh Organic Products'
        }
      };

      console.log('📋 Payment options configured:', {
        key: options.key,
        amount: options.amount,
        currency: options.currency,
        name: options.name,
        description: options.description
      });

      // Create and open Razorpay instance
      console.log('🎯 Creating Razorpay instance...');
      const razorpay = new window.Razorpay(options);
      
      console.log('🎯 Opening Razorpay modal...');
      razorpay.open();
      
      console.log('✅ Razorpay modal opened successfully');

      return true;

    } catch (err) {
      console.error('❌ Payment initialization error:', err);
      setError(err.message);
      setLoading(false);
      toast.error('Failed to initialize payment. Please try again.');
      onFailure(err);
      return false;
    }
  };

  // Check if Razorpay is available
  const isAvailable = () => {
    return config !== null && window.Razorpay && !error;
  };

  return {
    config,
    loading,
    error,
    isAvailable,
    initializePayment
  };
};

export default useRazorpay;
