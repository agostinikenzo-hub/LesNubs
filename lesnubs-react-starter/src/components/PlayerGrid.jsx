import React, { useMemo } from 'react'
import PlayerCard from './PlayerCard'

/**
 * PlayerGrid expects data: array of objects (parsed CSV with headers as keys)
 * It will try to detect a column that contains player names: 'player' (case-insensitive),
 * otherwise uses the first column.
 */
export default function PlayerGrid({ data }){
  // detect player column name
  const playerKey = useMemo(() => {
    if(!data || data.length === 0) return null
    const keys = Object.keys(data[0])
    const lower = keys.map(k => k.toLowerCase())
    const idx = lower.indexOf('player') !== -1 ? lower.indexOf('player') : (lower.indexOf('name') !== -1 ? lower.indexOf('name') : 0)
    return keys[idx]
  }, [data])

  // detect numeric columns for sparkline: choose first numeric column other than playerKey
  const numericKey = useMemo(() => {
    if(!data || data.length === 0) return null
    const keys = Object.keys(data[0]).filter(k => k !== playerKey)
    for(const k of keys){
      // check if at least one value is numeric
      if(data.some(row => row[k] !== undefined && row[k] !== '' && !isNaN(Number(String(row[k]).replace(/,/g,''))))){
        return k
      }
    }
    return null
  }, [data, playerKey])

  // group by player
  const grouped = useMemo(() => {
    if(!data) return {}
    const map = {}
    data.forEach(row => {
      const player = row[playerKey] ?? 'Unknown'
      if(!map[player]) map[player] = []
      map[player].push(row)
    })
    return map
  }, [data, playerKey])

  const players = Object.entries(grouped)

  return (
    <div>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {players.map(([player, rows]) => (
          <PlayerCard key={player} name={player} rows={rows} numericKey={numericKey} />
        ))}
      </div>
      {players.length === 0 && <div className="text-gray-600">No players found in data.</div>}
    </div>
  )
}
