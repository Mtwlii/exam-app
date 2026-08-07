import { startTransition, useEffect, useState } from "react"


export default function Example() {
  // Snapshot
  const [count, setCount] = useState(1)
  const [loading, setLoading] = useState(false)
  const [countB, setCountB] = useState(10) // 40

  // Functions
  const increment = () => {
    setCount(countB) // 40
    setCount(count => count + countB) // 40 + 40 = 80
    setCount(prev => prev * countB) // 80 * 40 = 3,200
    setCount(prev => prev * countB / count) // (3,200 * 40) / 1 = 128,000
    setCountB(count => count + 20) // countB = 60
    setLoading(true)
    setCount(prev => prev / 2 + countB * 2 + count * count); // 64,000 + 80 + 1 = 64,081

    setCount(prev => prev * countB / count / 2 + countB * 2 + count * count); // 1281620 + 81 = 1,281,701
  }
  console.log('count', count)
  console.log('countB', countB)

  const calculateTotal = () => {
    setCountB(count => count * 2)
    setCountB(prev => prev / 2)
  }

  useEffect(() => {
    startTransition(() => {
      setCountB(prev => prev * 2) // 40
    })

    startTransition(() => {
      if (loading) calculateTotal();
    })
  }, [loading])

  /**
   * Mohamed Galam => 100 EGP
   * Mohamed Hegazy => 100 EGP
   */

  return (
    <div>
      {/* Headline */}
      <h1>State</h1>

      {/* Content */}
      <p>Count: {count}</p>

      {/* Button */}
      <button
        onClick={increment}>Increment</button>
    </div>
  )
}
