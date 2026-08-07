import { forwardRef, useEffect, useRef } from "react"


export default function RefExample({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current.focus()
  }, [])


  return (
    <input ref={inputRef} placeholder="Enter your name" className={"p-4 " + className} {...props} />
  )
}


export const RefExampleWithRef = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, ...props }, ref) => {
  return (
    <input ref={ref} placeholder="Enter your name" className={"p-4 " + className} {...props} />
  )
})

interface RefNewExampleProps extends React.InputHTMLAttributes<HTMLInputElement> {
  ref: React.RefObject<HTMLInputElement>;
}

export function RefNewExample({ className, ref, ...props }: RefNewExampleProps) {
  return (
    <input ref={ref} placeholder="Enter your name" className={"p-4 " + className} {...props} />
  )
}