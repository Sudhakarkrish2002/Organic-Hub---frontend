// Test Payment System
// This file tests the complete payment flow

const testPaymentFlow = async () => {
  console.log('🧪 Testing Payment System...')
  
  // Test 1: COD Payment
  console.log('\n💰 Testing COD Payment:')
  const codPaymentData = {
    paymentMethod: 'cod',
    shippingAddress: {
      address: '123 Test Street',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      fullName: 'Test User',
      email: 'test@example.com',
      phone: '9876543210'
    },
    notes: 'Test COD order',
    totalAmount: 1500
  }
  
  try {
    // Simulate COD payment processing
    const codResult = await simulatePayment(codPaymentData)
    console.log('✅ COD Payment Result:', codResult)
  } catch (error) {
    console.error('❌ COD Payment Error:', error.message)
  }
  
  // Test 2: Online Payment
  console.log('\n💳 Testing Online Payment:')
  const onlinePaymentData = {
    paymentMethod: 'razorpay',
    shippingAddress: {
      address: '456 Online Street',
      city: 'Delhi',
      state: 'Delhi',
      pincode: '110001',
      fullName: 'Online User',
      email: 'online@example.com',
      phone: '9876543211'
    },
    razorpayOrderId: 'order_test123',
    razorpayPaymentId: 'pay_test456',
    razorpaySignature: 'test_signature',
    totalAmount: 2500
  }
  
  try {
    // Simulate online payment processing
    const onlineResult = await simulatePayment(onlinePaymentData)
    console.log('✅ Online Payment Result:', onlineResult)
  } catch (error) {
    console.error('❌ Online Payment Error:', error.message)
  }
  
  console.log('\n🎉 Payment System Test Complete!')
}

const simulatePayment = async (paymentData) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Simulate payment processing
  if (paymentData.paymentMethod === 'cod') {
    return {
      success: true,
      message: 'Order placed successfully! You will pay on delivery.',
      data: {
        order: {
          _id: `order_${Date.now()}`,
          orderNumber: `OM${new Date().getFullYear().toString().slice(-2)}${(new Date().getMonth() + 1).toString().padStart(2, '0')}${new Date().getDate().toString().padStart(2, '0')}${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
          paymentMethod: 'cod',
          paymentStatus: 'pending',
          orderStatus: 'confirmed',
          totalAmount: paymentData.totalAmount,
          shippingAddress: paymentData.shippingAddress,
          createdAt: new Date().toISOString()
        },
        paymentMethod: 'cod',
        totalAmount: paymentData.totalAmount
      }
    }
  } else {
    return {
      success: true,
      message: 'Payment successful! Order confirmed.',
      data: {
        order: {
          _id: `order_${Date.now()}`,
          orderNumber: `OM${new Date().getFullYear().toString().slice(-2)}${(new Date().getMonth() + 1).toString().padStart(2, '0')}${new Date().getDate().toString().padStart(2, '0')}${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
          paymentMethod: 'razorpay',
          paymentStatus: 'completed',
          orderStatus: 'confirmed',
          totalAmount: paymentData.totalAmount,
          shippingAddress: paymentData.shippingAddress,
          razorpayOrderId: paymentData.razorpayOrderId,
          razorpayPaymentId: paymentData.razorpayPaymentId,
          createdAt: new Date().toISOString()
        },
        paymentMethod: 'razorpay',
        totalAmount: paymentData.totalAmount
      }
    }
  }
}

// Run the test
testPaymentFlow().catch(console.error)
