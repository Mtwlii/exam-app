import { startTransition, useCallback, useEffect, useMemo, useState } from "react";


const items = [
  {
    id: 1,
    name: 'Item 1',
    price: 100,
  },
  {
    id: 2,
    name: 'Item 2',
    price: 200,
  },
  {
    id: 3,
    name: 'Item 3',
    price: 300,
  }
]

export default function ReactCompilerExample() {
  // State
  const [toggle, setToggle] = useState(false)

  // Variables
  console.time('list')
  const list =
    useMemo(() => Array.from({ length: 1000000 }, (_, index) => index + 1)
      .map(() => items), [])
  console.timeEnd('list')
  // useMemo() ❌
  // useCallback() ❌
  // memo() ❌

  const handleToggle = useCallback(() => {
    setToggle(!toggle)
  }, [])

  useEffect(() => {
    startTransition(() => {
      handleToggle()
    })
  }, [toggle, handleToggle])


  return (
    <div>
      <h1>React Compiler Example</h1>
      <button onClick={() => console.log(list)}>Log List</button>
      <button onClick={() => setToggle(!toggle)}>Toggle</button>
    </div>
  )
}
