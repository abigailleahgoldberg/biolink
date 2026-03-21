'use client'
import { useEffect, useState } from 'react'

function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = target / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= target) { setVal(target); clearInterval(timer) }
      else setVal(Math.floor(current))
    }, duration / steps)
    return () => clearInterval(timer)
  }, [target])
  return <>{val.toLocaleString()}{suffix}</>
}

export default function LiveCounter() {
  return (
    <div className="live-counter">
      <div className="live-counter-item">
        <div className="live-counter-num"><Counter target={12847} /></div>
        <div className="live-counter-label">Active Profiles</div>
      </div>
      <div className="live-counter-item">
        <div className="live-counter-num"><Counter target={4182091} /></div>
        <div className="live-counter-label">Total Views</div>
      </div>
      <div className="live-counter-item">
        <div className="live-counter-num"><Counter target={891432} /></div>
        <div className="live-counter-label">Links Clicked</div>
      </div>
    </div>
  )
}
