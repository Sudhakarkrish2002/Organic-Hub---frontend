// Test script to verify Razorpay configuration
console.log('🧪 Testing Razorpay Configuration...\n');

// Check environment variable
const envKeyId = process.env.VITE_RAZORPAY_KEY_ID;
console.log('📋 Environment Variable Check:');
console.log('VITE_RAZORPAY_KEY_ID:', envKeyId ? envKeyId : 'NOT SET');

if (envKeyId && envKeyId.startsWith('rzp_test_') && !envKeyId.includes('demo')) {
  console.log('✅ Real Razorpay key detected!');
  console.log('💳 Key ID:', envKeyId);
  console.log('🚀 Real payment integration will be used');
} else if (envKeyId && envKeyId.includes('demo')) {
  console.log('🧪 Demo Razorpay key detected');
  console.log('⚠️  Demo mode will be used');
} else {
  console.log('❌ No valid Razorpay key found');
  console.log('🧪 Demo mode will be used');
}

console.log('\n📝 Next Steps:');
console.log('1. Restart your development server');
console.log('2. Go to checkout page');
console.log('3. Select "Online Payment"');
console.log('4. Click "Proceed to Payment"');
console.log('5. Real Razorpay modal should open');

console.log('\n🧪 Test Card Details:');
console.log('Card: 4111 1111 1111 1111');
console.log('Expiry: Any future date');
console.log('CVV: Any 3 digits');
console.log('UPI: success@razorpay');
