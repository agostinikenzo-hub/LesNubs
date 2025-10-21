import React, { useMemo } from 'react'
import { LineChart, Line, ResponsiveContainer, XAxis, Tooltip } from 'recharts'

export default function PlayerCard({ name, rows, numericKey }){
  // prepare sparkline data: take last 8 numeric values from rows
  const data = useMemo(() => {
    if(!numericKey) return []
    const arr = rows.map(r => {
      const raw = r[numericKey]
      const n = raw === undefined || raw === '' ? null : Number(String(raw).replace(/,/g,''))
      return { value: n, label: r[numericKey] ?? '' }
    }).filter(d => d.value !== null && !isNaN(d.value))
    // take last 12
    return arr.slice(-12).map((d, i) => ({ ...d, x: i }))
  }, [rows, numericKey])

  // compute summary metric (last value)
  const lastValue = data.length ? data[data.length-1].value : null

  return (
    <div className="bg-white rounded-xl shadow p-4 border border-gray-200">
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-sm text-gray-500">Player</div>
          <div className="text-lg font-semibold text-sky-700">{name}</div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500">Current</div>
          <div className="text-xl font-bold">{lastValue !== null ? lastValue : '—'}</div>
        </div>
      </div>

      <div style={{ width: '100%', height: 60 }}>
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="x" hide />
              <Tooltip formatter={(v) => v} />
              <Line type="monotone" dataKey="value" stroke="#0ea5e9" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-xs text-gray-400">No numeric data for sparkline</div>
        )}
      </div>

      <div className="mt-3 text-xs text-gray-500">
        {rows.length} rows
      </div>
    </div>
  )
}
