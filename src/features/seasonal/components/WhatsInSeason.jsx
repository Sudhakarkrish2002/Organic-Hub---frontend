import React from 'react'

const WhatsInSeason = ({ items = [] }) => (
  <ul className="list-disc ml-6">
    {items.length ? items.map((it) => <li key={it.id || it}>{it.name || it}</li>) : <li>No seasonal items</li>}
  </ul>
)

export default WhatsInSeason
