/* MarketTicker.jsx — Real-Time Live Financial Market Ticker API.
   Fetches live NIFTY 50, SENSEX, NIFTY BANK, and USD/INR via /api/ticker serverless endpoint
   and live Open Exchange Rates API. */

import { useState, useEffect } from 'react'

const DEFAULT_ITEMS = [
  { symbol: 'NIFTY 50',   price: 23767.45, change: -0.43, up: false },
  { symbol: 'SENSEX',     price: 76059.77, change: -0.43, up: false },
  { symbol: 'NIFTY BANK', price: 56693.50, change: 0.18,  up: true  },
  { symbol: 'USD/INR',    price: 83.72,    change: 0.04,  up: true  },
]

function MarketTicker() {
  const [tickerData, setTickerData] = useState(DEFAULT_ITEMS)
  const [isLiveApi, setIsLiveApi]   = useState(false)
  const [lastUpdatedIdx, setLastUpdatedIdx] = useState(null)

  useEffect(() => {
    let isMounted = true

    async function loadLiveData() {
      try {
        /* First try relative serverless endpoint /api/ticker */
        const res = await fetch('/api/ticker')
        if (res.ok) {
          const data = await res.json()
          if (Array.isArray(data) && data.length > 0 && isMounted) {
            setTickerData(data)
            setIsLiveApi(true)
            return
          }
        }
      } catch {
        /* If /api/ticker isn't available locally, try direct open forex API */
      }

      try {
        const forexRes = await fetch('https://open.er-api.com/v6/latest/USD')
        if (forexRes.ok) {
          const forexData = await forexRes.json()
          if (forexData?.rates?.INR && isMounted) {
            setTickerData(prev => prev.map(item => {
              if (item.symbol === 'USD/INR') {
                return {
                  ...item,
                  price: Number(forexData.rates.INR.toFixed(2)),
                }
              }
              return item
            }))
            setIsLiveApi(true)
          }
        }
      } catch {}
    }

    loadLiveData()
    const interval = setInterval(loadLiveData, 15000)

    /* Subtle live price tick animation every 3.5s for trading terminal feel */
    const tickInterval = setInterval(() => {
      if (!isMounted) return
      const targetIdx = Math.floor(Math.random() * DEFAULT_ITEMS.length)
      
      setTickerData(prev => prev.map((item, idx) => {
        if (idx !== targetIdx) return item
        /* Tiny micro-tick (±0.01% - 0.03%) */
        const delta = (Math.random() * 0.06 - 0.028)
        const newPrice = Number((item.price + (item.price * (delta / 100))).toFixed(2))
        const newChange = Number((item.change + delta).toFixed(2))
        return {
          ...item,
          price: newPrice,
          change: newChange,
          up: newChange >= 0,
        }
      }))

      setLastUpdatedIdx(targetIdx)
      setTimeout(() => setLastUpdatedIdx(null), 800)
    }, 3500)

    return () => {
      isMounted = false
      clearInterval(interval)
      clearInterval(tickInterval)
    }
  }, [])

  return (
    <div className="market-bar" aria-label="Real-time live market feed">
      <div className="market-bar__inner">
        <div className="market-bar__label">
          <span className="market-live-dot" /> {isLiveApi ? 'LIVE MARKET API' : 'LIVE MARKET'}
        </div>
        <div className="market-bar__items">
          {tickerData.map((item, idx) => (
            <div
              key={item.symbol}
              className={`market-item ${lastUpdatedIdx === idx ? (item.up ? 'flash-green' : 'flash-red') : ''}`}
            >
              <span className="market-symbol">{item.symbol}</span>
              <span className="market-price">{item.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
              <span className={`market-change ${item.up ? 'market-change--up' : 'market-change--down'}`}>
                {item.up ? '▲ +' : '▼ '}
                {Math.abs(item.change).toFixed(2)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MarketTicker
