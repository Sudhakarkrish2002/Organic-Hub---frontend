// Test script for authentication system
// Run this in the browser console to test authentication functionality

console.log('🔐 Testing Organic Hub Authentication System...');

// Test 1: Check if localStorage is available
if (localStorage) {
  console.log('✅ localStorage is available');
  
  // Test 2: Check current authentication state
  const currentToken = localStorage.getItem('token');
  const currentUser = localStorage.getItem('user');
  
  console.log('🔍 Current Auth State:');
  console.log('Token:', currentToken ? 'Present' : 'None');
  console.log('User:', currentUser ? JSON.parse(currentUser).name : 'None');
  
  // Test 3: Create a test user if none exists
  const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
  if (existingUsers.length === 0) {
    console.log('👤 Creating test user...');
    
    const testUser = {
      _id: 'test_user_' + Date.now(),
      name: 'Test User',
      email: 'test@example.com',
      phone: '9876543210',
      password: 'password123',
      createdAt: new Date().toISOString(),
      isActive: true,
      role: 'user'
    };
    
    existingUsers.push(testUser);
    localStorage.setItem('users', JSON.stringify(existingUsers));
    
    console.log('✅ Test user created:', testUser.email);
    console.log('🔑 Password:', testUser.password);
  } else {
    console.log('👥 Existing users found:', existingUsers.length);
    existingUsers.forEach((user, index) => {
      console.log(`${index + 1}. ${user.name} (${user.email})`);
    });
  }
  
  // Test 4: Check if user can be authenticated
  const testEmail = 'test@example.com';
  const testPassword = 'password123';
  
  const user = existingUsers.find(u => u.email === testEmail && u.password === testPassword);
  if (user) {
    console.log('✅ Test user can be authenticated');
    
    // Test 5: Create authentication token
    const token = btoa(JSON.stringify({ userId: user._id, email: user.email }));
    console.log('🔑 Generated token:', token);
    
    // Test 6: Simulate login
    console.log('🚀 Simulating login...');
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role
    }));
    
    console.log('✅ Login simulation completed');
    console.log('🔄 Please refresh the page to see the authentication state');
    
  } else {
    console.log('❌ Test user authentication failed');
  }
  
  // Test 7: Check protected routes
  console.log('');
  console.log('📋 Protected Routes Test:');
  console.log('1. /profile - User profile');
  console.log('2. /orders - User orders');
  console.log('3. /wishlist - User wishlist');
  console.log('4. /checkout - Checkout (requires auth)');
  
  console.log('');
  console.log('🧪 To test the full flow:');
  console.log('1. Refresh the page');
  console.log('2. Check if you can see user menu in header');
  console.log('3. Try navigating to /profile, /orders, /wishlist');
  console.log('4. Check the debug panel in bottom-right corner');
  
} else {
  console.log('❌ localStorage is not available');
}

console.log('');
console.log('📚 For more information, check the console and debug panel');
