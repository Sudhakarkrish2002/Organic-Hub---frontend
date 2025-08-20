import React from 'react'
import Overview from '@/components/Admin/Dashboard/Overview'
import Analytics from '@/components/Admin/Dashboard/Analytics'
import QuickStats from '@/components/Admin/Dashboard/QuickStats'

const Dashboard = () => (
  <div className="max-w-6xl mx-auto px-4 py-6 space-y-4">
    <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
    <QuickStats />
    <Overview />
    <Analytics />
  </div>
)

export default Dashboard


