import React from 'react'
import Overview from '@/features/admin/components/Dashboard/Overview'
import Analytics from '@/features/admin/components/Dashboard/Analytics'
import QuickStats from '@/features/admin/components/Dashboard/QuickStats'

const Dashboard = () => (
  <div className="max-w-6xl mx-auto px-4 py-6 space-y-4">
    <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
    <QuickStats />
    <Overview />
    <Analytics />
  </div>
)

export default Dashboard


