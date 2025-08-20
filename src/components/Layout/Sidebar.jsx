import React from 'react'

const Sidebar = () => (
  <aside className="hidden md:block w-64 border-r p-4">
    <nav className="space-y-2">
      <a href="/products?category=vegetables">Vegetables</a>
      <a href="/products?category=fruits">Fruits</a>
      <a href="/products?category=dairy">Dairy</a>
      <a href="/products?category=grains">Grains</a>
      <a href="/products?category=natural">Natural</a>
    </nav>
  </aside>
)

export default Sidebar


