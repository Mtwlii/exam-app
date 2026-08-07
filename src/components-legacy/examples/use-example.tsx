import { createContext, startTransition, use, useContext, useEffect, useState } from "react";



const exampleContext = createContext<number>(0);




// Suspended
export default function UseExample({ fetchDataPromise }: { fetchDataPromise: Promise<any> }) {
  const data = use(fetchDataPromise)
  // const data = use(fetchData())
  // const [data, setData] = useState<any>([]);

  // useEffect(() => {
  //   const data = fetchData();
  //   startTransition(() => setData(data))
  // }, []);

  console.log(data)

  // const example = useContext(exampleContext);

  const x = 2;
  if (x === 2) {
    const x = use(exampleContext);
    // Consume promises
    // Consume context => useContext()
  }

  return (
    <div>UseExample</div>
  )
}
