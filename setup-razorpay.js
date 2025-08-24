#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🚀 Razorpay Setup for Organic Hub');
console.log('=====================================\n');

console.log('📋 Steps to get your Razorpay test keys:');
console.log('1. Go to: https://dashboard.razorpay.com/');
console.log('2. Sign in to your account');
console.log('3. Go to Settings → API Keys');
console.log('4. Copy your Key ID (starts with rzp_test_)\n');

rl.question('Enter your Razorpay Key ID (or press Enter to skip): ', (keyId) => {
  if (!keyId.trim()) {
    console.log('\n❌ No key provided. Payment will use demo mode.');
    rl.close();
    return;
  }

  if (!keyId.startsWith('rzp_test_')) {
    console.log('\n❌ Invalid key format. Key should start with "rzp_test_"');
    rl.close();
    return;
  }

  const envContent = `# Razorpay Configuration
VITE_RAZORPAY_KEY_ID=${keyId}

# Other environment variables can be added here
`;

  const envPath = path.join(__dirname, '.env');
  
  try {
    fs.writeFileSync(envPath, envContent);
    console.log('\n✅ Razorpay key configured successfully!');
    console.log(`📁 File created: ${envPath}`);
    console.log('\n🔄 Please restart your development server:');
    console.log('   npm run dev');
    console.log('\n💳 Now your payment system will use real Razorpay integration!');
  } catch (error) {
    console.error('\n❌ Error creating .env file:', error.message);
  }

  rl.close();
});
