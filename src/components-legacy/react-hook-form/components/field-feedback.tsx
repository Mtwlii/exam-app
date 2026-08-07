import type { FieldError } from 'react-hook-form'

interface FieldFeedbackProps {
  error: FieldError
}

export default function FieldFeedback({ error }: FieldFeedbackProps) {
  if (!error) return null;

  if (!error.types) return <p className='text-red-500 text-sm'>{error.message}</p>

  return <ul className='text-red-500 text-sm'>
    {Object.values(error.types).map((error, index) => <li key={index}>{error}</li>)}
  </ul>
}
