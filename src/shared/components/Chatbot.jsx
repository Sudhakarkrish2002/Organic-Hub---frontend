import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot, User } from 'lucide-react'

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  // Reset chat when opening
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Small delay to show fresh start
      setTimeout(() => {
        setMessages([
          {
            id: Date.now(),
            type: 'bot',
            content: 'Hello! 👋 I\'m your Organic Hub assistant. How can I help you today?\n\nI can help you with:\n• Product information and availability\n• Delivery and shipping details\n• Payment methods and security\n• Returns and refunds\n• Bulk orders and discounts\n• Seasonal products\n• Order tracking\n• Account management',
            timestamp: new Date()
          }
        ])
      }, 100)
    }
  }, [isOpen, messages.length])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Simple knowledge base
  const getResponse = (message) => {
    const lowerMessage = message.toLowerCase()
    
    if (lowerMessage.includes('product') || lowerMessage.includes('item') || lowerMessage.includes('offer')) {
      return 'We offer a wide variety of fresh organic products! 🌱\n\n• Fresh Vegetables: Carrots, tomatoes, cucumbers, leafy greens, and more\n• Fresh Fruits: Apples, bananas, oranges, seasonal fruits\n• Dairy Products: Milk, cheese, yogurt, butter\n• Grains & Pulses: Rice, wheat, lentils, beans\n• Nuts & Seeds: Almonds, walnuts, sunflower seeds\n• Honey & Jams: Pure organic honey, fruit jams\n• Herbs & Spices: Fresh herbs, whole spices\n\nAll products are certified organic and sourced directly from trusted farmers. No pesticides or harmful chemicals!'
    }
    
    if (lowerMessage.includes('delivery') || lowerMessage.includes('shipping') || lowerMessage.includes('arrive')) {
      return 'Our delivery service is fast and reliable! 🚚\n\n• Standard Delivery: 24-48 hours\n• Express Delivery: Same day (available in select areas)\n• Free Delivery: On orders above ₹500\n• Delivery Charges: ₹50 for orders below ₹500\n• Order Tracking: Real-time updates via SMS and dashboard\n• Delivery Areas: Most areas within the city\n• Delivery Time: 9 AM to 8 PM\n\nYou can track your order in your account dashboard or through SMS notifications!'
    }
    
    if (lowerMessage.includes('payment') || lowerMessage.includes('pay') || lowerMessage.includes('secure')) {
      return 'We offer multiple secure payment options! 💳\n\n• Credit/Debit Cards: All major cards accepted\n• UPI: All UPI apps supported\n• Net Banking: All major banks\n• Digital Wallets: Paytm, PhonePe, Google Pay\n• Cash on Delivery: Available for orders below ₹1000\n• Razorpay Integration: Secure payment gateway\n• SSL Encryption: All transactions are encrypted\n• Payment Security: PCI DSS compliant\n\nAll online transactions are 100% secure and encrypted for your safety!'
    }
    
    if (lowerMessage.includes('return') || lowerMessage.includes('refund') || lowerMessage.includes('satisfied')) {
      return 'We have a customer-first return policy! 🔄\n\n• Return Window: 7 days from delivery\n• Return Reasons: Damaged products, wrong items, quality issues\n• Refund Process: Full refund or replacement\n• Return Charges: Free returns for quality issues\n• Refund Time: 3-5 business days\n• Contact Support: 24/7 customer service\n• Satisfaction Guarantee: 100% satisfaction or money back\n\nContact our support team for any issues - we\'re here to help!'
    }
    
    if (lowerMessage.includes('organic') || lowerMessage.includes('certified') || lowerMessage.includes('pesticide')) {
      return 'All our products are certified organic! 🌿\n\n• Organic Certification: Government approved\n• No Pesticides: Completely pesticide-free\n• No Chemicals: No harmful chemicals used\n• Natural Farming: Traditional farming methods\n• Soil Health: Maintained through organic practices\n• Quality Standards: Multiple quality checks\n• Traceability: Full farm-to-table traceability\n• Health Benefits: Better for you and the environment\n\nWe ensure the highest quality organic products for your health and wellness!'
    }
    
    if (lowerMessage.includes('bulk') || lowerMessage.includes('discount') || lowerMessage.includes('wholesale')) {
      return 'Great deals on bulk orders! 📦\n\n• 5-10 items: 5% discount\n• 11-20 items: 10% discount\n• 21+ items: 15% discount\n• Free Delivery: On all bulk orders\n• Priority Processing: Faster order processing\n• Custom Packaging: Available for large orders\n• Business Accounts: Special rates for businesses\n• Wholesale Inquiries: Contact us for custom quotes\n\nBulk orders are perfect for families, offices, or events!'
    }
    
    if (lowerMessage.includes('seasonal') || lowerMessage.includes('season')) {
      return 'Fresh seasonal products available! 🍂\n\n• Spring (March-May): Fresh greens, peas, strawberries\n• Summer (June-August): Mangoes, melons, cucumbers\n• Monsoon (September-November): Mushrooms, leafy greens, pumpkins\n• Winter (December-February): Citrus fruits, root vegetables, spinach\n• Local Sourcing: Fresh from local farms\n• Peak Freshness: Harvested at optimal time\n• Seasonal Discounts: Special prices on seasonal items\n• Limited Availability: Get them while they last!\n\nCheck our seasonal section for current offerings!'
    }
    
    if (lowerMessage.includes('track') || lowerMessage.includes('order status')) {
      return 'Track your order easily! 📱\n\n• Account Dashboard: Real-time order status\n• SMS Updates: Automatic delivery updates\n• Email Notifications: Order confirmations and updates\n• Order Number: Track using your order ID\n• Delivery Partner: Direct tracking links\n• Estimated Delivery: Accurate delivery times\n• Delivery Alerts: Notifications before delivery\n• Contact Support: Help with tracking issues\n\nWe provide comprehensive tracking for all your orders!'
    }
    
    if (lowerMessage.includes('account') || lowerMessage.includes('register') || lowerMessage.includes('sign up')) {
      return 'Creating an account is free and beneficial! 👤\n\n• Free Registration: No charges to sign up\n• Order History: Track all your past orders\n• Wishlist: Save products for later\n• Personalized Recommendations: Based on your preferences\n• Loyalty Points: Earn points on every purchase\n• Faster Checkout: Save delivery addresses\n• Exclusive Offers: Member-only discounts\n• Easy Returns: Simplified return process\n\nSign up now and start enjoying these benefits!'
    }
    
    if (lowerMessage.includes('fresh') || lowerMessage.includes('quality')) {
      return 'We guarantee the freshest quality! ✨\n\n• Same Day Harvest: Products harvested fresh daily\n• Quality Checks: Multiple quality inspections\n• Cold Storage: Proper temperature maintenance\n• Fast Delivery: Quick delivery to maintain freshness\n• Freshness Guarantee: Money back if not fresh\n• Quality Standards: Strict quality protocols\n• Farm Direct: No middlemen, direct from farms\n• Organic Practices: Natural freshness preservation\n\nOur products are delivered fresh to your doorstep!'
    }
    
    if (lowerMessage.includes('vegetable') || lowerMessage.includes('fruit')) {
      return 'We have the freshest organic produce! 🥬🍎\n\n• Fresh Vegetables: Carrots, tomatoes, cucumbers, spinach, potatoes, onions, garlic, ginger, and more\n• Fresh Fruits: Apples, bananas, oranges, mangoes, grapes, pomegranates, seasonal fruits\n• Leafy Greens: Spinach, lettuce, kale, coriander, mint\n• Root Vegetables: Carrots, potatoes, sweet potatoes, beets\n• All Organic: 100% pesticide-free\n• Farm Fresh: Harvested same day\n• Quality Assured: Multiple quality checks\n• Seasonal Variety: Fresh seasonal produce\n\nAll vegetables and fruits are organic and farm-fresh!'
    }
    
    if (lowerMessage.includes('area') || lowerMessage.includes('location')) {
      return 'We deliver to most areas! 📍\n\n• City Coverage: Most areas within the city\n• Delivery Zones: Check your address during checkout\n• Expanding Coverage: Adding new areas regularly\n• Rural Areas: Limited coverage, expanding soon\n• Office Delivery: Available for business addresses\n• Gated Communities: Delivery to security desk\n• Apartment Buildings: Doorstep delivery\n• Remote Areas: Contact us for availability\n\nPlease check your delivery address during checkout. If we don\'t deliver to your area yet, we\'re expanding quickly!'
    }
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return 'Hello! 👋 How can I help you with our organic products today?\n\nI can assist you with:\n• Product information\n• Delivery details\n• Payment options\n• Returns and refunds\n• Bulk orders\n• Seasonal products\n• Order tracking\n• Account management\n\nJust ask me anything!'
    }
    
    if (lowerMessage.includes('thank')) {
      return 'You\'re welcome! 😊\n\nIs there anything else I can help you with? I\'m here to assist you with all your organic shopping needs!\n\nFeel free to ask about products, delivery, payments, or any other questions you might have.'
    }
    
    return 'I\'m here to help with all your organic shopping needs! 🤔\n\nI can assist you with:\n• Product information and availability\n• Delivery and shipping details\n• Payment methods and security\n• Returns and refunds\n• Bulk orders and discounts\n• Seasonal products\n• Order tracking\n• Account management\n\nCould you please be more specific about what you\'d like to know?'
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage = inputValue.trim()
    setInputValue('')
    
    // Add user message
    setMessages(prev => [...prev, {
      id: Date.now(),
      type: 'user',
      content: userMessage,
      timestamp: new Date()
    }])
    
    setIsTyping(true)

    // Simulate response
    setTimeout(() => {
      const botResponse = getResponse(userMessage)
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        type: 'bot',
        content: botResponse,
        timestamp: new Date()
      }])
      setIsTyping(false)
    }, 800)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Reset chat when closing
  const handleCloseChat = () => {
    setIsOpen(false)
    setMessages([])
    setInputValue('')
    setIsTyping(false)
  }

  const quickQuestions = [
    'What products do you offer?',
    'How does delivery work?',
    'What payment methods do you accept?',
    'What is your return policy?',
    'Are your products really organic?',
    'Do you offer bulk discounts?',
    'What seasonal products do you have?',
    'How do I track my order?',
    'Can I create an account?',
    'What are your delivery charges?',
    'Do you have fresh vegetables?',
    'Is online payment secure?',
    'How fresh are your products?',
    'Do you deliver to my area?',
    'What if I\'m not satisfied?'
  ]

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 bg-green-600 hover:bg-green-700 text-white p-3 sm:p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
      </motion.button>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[9999] flex items-end justify-end p-2 sm:p-3 md:p-4"
            onClick={handleCloseChat}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl h-[32rem] sm:h-[36rem] md:h-[40rem] lg:h-[44rem] xl:h-[40rem] flex flex-col border border-gray-100"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-2 sm:p-3 md:p-4 lg:p-5 rounded-t-2xl flex items-center justify-between">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="bg-white/20 p-1.5 sm:p-2 md:p-2.5 rounded-full">
                    <Bot className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm sm:text-base md:text-lg">Organic Hub Assistant</h3>
                    <p className="text-xs sm:text-sm md:text-base text-green-100">Online • Ready to help</p>
                  </div>
                </div>
                <button
                  onClick={handleCloseChat}
                  className="hover:bg-white/20 p-1 sm:p-1.5 rounded-full transition-colors"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-2 sm:p-3 md:p-4 lg:p-5 space-y-3 sm:space-y-4 bg-gray-50/50">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start space-x-3 max-w-[95%] sm:max-w-[90%] md:max-w-[85%] lg:max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className={`p-2.5 sm:p-3 rounded-full flex-shrink-0 ${message.type === 'user' ? 'bg-green-600 text-white' : 'bg-green-100 text-green-700 shadow-sm'}`}>
                        {message.type === 'user' ? <User className="w-4 h-4 sm:w-5 sm:h-5" /> : <Bot className="w-4 h-4 sm:w-5 sm:h-5" />}
                      </div>
                      <div className={`rounded-2xl px-4 py-3 sm:px-5 sm:py-4 md:px-6 md:py-5 lg:px-7 lg:py-5 text-sm sm:text-base md:text-lg shadow-lg break-words max-w-full ${
                        message.type === 'user' 
                          ? 'bg-green-600 text-white' 
                          : 'bg-white text-gray-800 border-2 border-green-100 shadow-xl'
                      }`}>
                        <div className="whitespace-pre-line leading-relaxed font-medium overflow-hidden">{message.content}</div>
                        <div className="text-xs text-gray-500 mt-2 opacity-70">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-start space-x-2">
                      <div className="p-1.5 sm:p-2 rounded-full bg-white shadow-sm flex-shrink-0">
                        <Bot className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                      </div>
                      <div className="bg-white border border-gray-100 rounded-2xl px-3 py-2 sm:px-4 sm:py-3 shadow-sm">
                        <div className="flex space-x-1">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-bounce"></div>
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Questions */}
              {(messages.length === 1 || (messages.length > 1 && messages[messages.length - 1].type === 'bot')) && (
                <div className="px-2 sm:px-3 md:px-4 lg:px-5 pb-2 sm:pb-3 bg-white border-t border-gray-100">
                  <p className="text-xs sm:text-sm md:text-base text-gray-500 mb-2 sm:mb-3 pt-2 sm:pt-3">
                    {messages.length === 1 ? 'Quick questions:' : 'You can also ask:'}
                  </p>
                  <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 max-h-20 sm:max-h-24 md:max-h-28 lg:max-h-32 overflow-y-auto">
                    {quickQuestions.slice(0, 8).map((question, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          // Add user message immediately
                          const userMsg = {
                            id: Date.now(),
                            type: 'user',
                            content: question,
                            timestamp: new Date()
                          }
                          setMessages(prev => [...prev, userMsg])
                          setIsTyping(true)

                          // Get bot response
                          setTimeout(() => {
                            const botResponse = getResponse(question)
                            const botMsg = {
                              id: Date.now() + 1,
                              type: 'bot',
                              content: botResponse,
                              timestamp: new Date()
                            }
                            setMessages(prev => [...prev, botMsg])
                            setIsTyping(false)
                          }, 800)
                        }}
                        className="text-xs sm:text-sm md:text-base lg:text-lg bg-green-50 text-green-700 px-3 sm:px-4 md:px-5 lg:px-6 py-2 sm:py-2.5 md:py-3 lg:py-3.5 rounded-full hover:bg-green-100 transition-colors border border-green-100 whitespace-nowrap"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input Area */}
              <div className="p-2 sm:p-3 md:p-4 lg:p-5 border-t border-gray-100 bg-white">
                <div className="flex space-x-2 sm:space-x-3">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 px-3 py-2 sm:px-4 sm:py-3 md:px-5 md:py-4 lg:px-6 lg:py-4 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base md:text-lg bg-gray-50"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                    className="bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white p-2 sm:p-3 md:p-4 rounded-full transition-colors shadow-sm flex-shrink-0"
                  >
                    <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Chatbot
