import React from 'react'
import { motion } from 'framer-motion'
import { Leaf, Sprout, Truck, Users, Award, ShieldCheck } from 'lucide-react'

const About = () => (
  <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
    {/* Hero */}
    <div className="bg-green-600 text-white py-16">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          About Organic Hub
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-lg md:text-xl text-green-100 max-w-2xl mx-auto"
        >
          We connect you with the freshest organic produce, sourced responsibly from local farms.
        </motion.p>
      </div>
    </div>

    <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
      {/* Mission */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-xl p-8"
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-green-100 text-green-700 flex items-center justify-center">
            <Leaf className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-green-800 mb-2">Our Mission</h2>
            <p className="text-gray-700">
              To make organic living accessible by delivering high-quality, chemical-free produce at fair prices,
              while supporting sustainable farming communities.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Values */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid md:grid-cols-3 gap-6"
      >
        {[
          { icon: <Sprout className="w-6 h-6" />, title: 'Sustainability', desc: 'Eco-friendly sourcing and minimal waste operations.' },
          { icon: <ShieldCheck className="w-6 h-6" />, title: 'Purity', desc: 'Certified organic, pesticide-free produce you can trust.' },
          { icon: <Users className="w-6 h-6" />, title: 'Community', desc: 'Fair trade partnerships with local farmers.' },
        ].map((item, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-xl p-6">
            <div className="w-12 h-12 rounded-xl bg-green-100 text-green-700 flex items-center justify-center mb-3">
              {item.icon}
            </div>
            <h3 className="font-semibold text-green-800 mb-1">{item.title}</h3>
            <p className="text-gray-600 text-sm">{item.desc}</p>
          </div>
        ))}
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white rounded-2xl shadow-xl p-8"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { label: 'Happy Customers', value: '25k+' },
            { label: 'Partner Farms', value: '120+' },
            { label: 'Daily Orders', value: '3k+' },
            { label: 'Cities Served', value: '30+' },
          ].map((stat, i) => (
            <div key={i}>
              <div className="text-2xl md:text-3xl font-bold text-green-700">{stat.value}</div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* How we work */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="grid md:grid-cols-3 gap-6"
      >
        {[
          { icon: <Sprout className="w-6 h-6" />, title: 'Farm Fresh', desc: 'Produce harvested at peak freshness from trusted organic farms.' },
          { icon: <Truck className="w-6 h-6" />, title: 'Cold Chain', desc: 'Temperature-controlled logistics preserving nutrients and taste.' },
          { icon: <Award className="w-6 h-6" />, title: 'Quality Check', desc: 'Multi-stage inspections to ensure premium quality.' },
        ].map((step, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-xl p-6">
            <div className="w-12 h-12 rounded-xl bg-green-100 text-green-700 flex items-center justify-center mb-3">
              {step.icon}
            </div>
            <h3 className="font-semibold text-green-800 mb-1">{step.title}</h3>
            <p className="text-gray-600 text-sm">{step.desc}</p>
          </div>
        ))}
      </motion.div>
    </div>
  </div>
)

export default About
