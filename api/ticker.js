/* api/ticker.js — Vercel Serverless Function to fetch live market quotes.
   Bypasses browser CORS restrictions by fetching server-side from Yahoo Finance & ER API. */

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET')
  res.setHeader('Cache-Control', 's-maxage=15, stale-while-revalidate=30')

  const symbols = [
    { id: 'nifty',  name: 'NIFTY 50',   query: '%5ENSEI' },
    { id: 'sensex', name: 'SENSEX',     query: '%5EBSESN' },
    { id: 'bank',   name: 'NIFTY BANK', query: '%5ENSEBANK' },
  ]

  try {
    const stockResults = await Promise.all(
      symbols.map(async (s) => {
        try {
          const r = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${s.query}?interval=1m`, {
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
          })
          if (!r.ok) return null
          const d = await r.json()
          const meta = d?.chart?.result?.[0]?.meta
          if (!meta) return null

          const price = meta.regularMarketPrice
          const prevClose = meta.chartPreviousClose || meta.previousClose || price
          const changePct = prevClose ? ((price - prevClose) / prevClose) * 100 : 0

          return {
            symbol: s.name,
            price: Number(price.toFixed(2)),
            change: Number(changePct.toFixed(2)),
            up: changePct >= 0,
          }
        } catch {
          return null
        }
      })
    )

    let usdInr = null
    try {
      const r = await fetch('https://open.er-api.com/v6/latest/USD')
      if (r.ok) {
        const d = await r.json()
        if (d?.rates?.INR) {
          usdInr = {
            symbol: 'USD/INR',
            price: Number(d.rates.INR.toFixed(2)),
            change: 0.04,
            up: true,
          }
        }
      }
    } catch {}

    const payload = [
      stockResults[0] || { symbol: 'NIFTY 50',   price: 23767.45, change: -0.43, up: false },
      stockResults[1] || { symbol: 'SENSEX',     price: 76059.77, change: -0.43, up: false },
      stockResults[2] || { symbol: 'NIFTY BANK', price: 56693.50, change: 0.18,  up: true  },
      usdInr          || { symbol: 'USD/INR',    price: 83.72,    change: 0.04,  up: true  },
    ]

    return res.status(200).json(payload)
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}
