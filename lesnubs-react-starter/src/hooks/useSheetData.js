import useSWR from 'swr'
import Papa from 'papaparse'

// IMPORTANT: replace this with your actual CSV URL if needed
const sheetUrl = "https://agostinikenzo-hub.github.io/LesNubs/google_sheets_live.csv";

async function fetchCsv(url){
  const res = await fetch(url)
  if(!res.ok) throw new Error('Network response was not ok: ' + res.status)
  const text = await res.text()
  // parse with header:true
  const parsed = Papa.parse(text, { header: true, skipEmptyLines: true })
  if(parsed.errors && parsed.errors.length) {
    console.warn('CSV parse errors:', parsed.errors)
  }
  return parsed.data
}

export function useSheetData(){
  const { data, error } = useSWR(sheetUrl, fetchCsv, { refreshInterval: 5 * 60 * 1000 })
  return {
    data,
    isLoading: !error && !data,
    error
  }
}
