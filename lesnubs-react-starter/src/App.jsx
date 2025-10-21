import React from 'react'
import PlayerGrid from './components/PlayerGrid'
import { useSheetData } from './hooks/useSheetData'

export default function App(){
  const { data, isLoading, error } = useSheetData()

  return (
    <div className="max-w-6xl mx-auto p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-sky-700">Les Nubs — Players Overview</h1>
        <p className="text-sm text-gray-600">Live demo: fetches CSV, groups by player, shows sparklines.</p>
      </header>

      <main>
        {isLoading && <div className="text-gray-600">Loading data…</div>}
        {error && <div className="text-red-600">Error loading data: {error.message}</div>}
        {!isLoading && data && <PlayerGrid data={data} />}
      </main>

      <footer className="mt-8 text-xs text-gray-500">
        Built with React + PapaParse + Recharts. Adapt columns detection in hooks/useSheetData.js
      </footer>
    </div>
  )
}
