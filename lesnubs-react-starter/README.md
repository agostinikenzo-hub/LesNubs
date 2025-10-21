Les Nubs — React UI Starter
=========================

This is a minimal React + Vite starter that fetches a CSV from a public URL, parses it with PapaParse,
and renders a grid of player cards with sparklines (using Recharts).

How to use
----------

1. Update the CSV source URL in `src/hooks/useSheetData.js` (variable `sheetUrl`) to point to your CSV.
   - You can use your Google Sheets published CSV link or a GitHub Pages hosted CSV.

2. Install dependencies and run locally:

```bash
cd lesnubs-react-starter
npm install
npm run dev
```

3. Open `http://localhost:5173` (or the port shown by Vite).

Notes
-----
- This starter uses the Tailwind CDN (no Tailwind build step) for convenience. For production,
  consider installing Tailwind properly.
- The app auto-refreshes the CSV every 5 minutes via SWR.
- The code heuristically detects a "player" column (case-insensitive 'player' or 'name', or falls back to first column).
  It also picks the first numeric column (other than the player column) for sparklines.
- Feel free to ask me to customize the UI or add routing / detail pages.
