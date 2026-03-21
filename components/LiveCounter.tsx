'use client'
import { useEffect, useState } from 'react'

function AnimatedNumber({ target, label }: { target: number; label: string }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = target / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [target])
  return (
    <div className="live-stat">
      <span className="live-number">{count.toLocaleString()}</span>
      <span className="live-label">{label}</span>
    </div>
  )
}

export default function LiveCounter() {
  return (
    <section className="live-counter-section">
      <AnimatedNumber target={10847} label="Active Profiles" />
      <AnimatedNumber target={2841956} label="Total Views" />
      <AnimatedNumber target={947201} label="Links Clicked" />
    </section>
  )
}
