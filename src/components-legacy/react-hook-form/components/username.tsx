import { useWatch, useFormContext, useFormState } from "react-hook-form";
import type { FormValues } from "../types/form";
import { Input } from "@/components/ui/input";



export default function Username() {
  const form = useFormContext<FormValues>();

  const formState = useFormState<FormValues>({
    name: 'username',
  });


  // const username = form.watch('username', 'username');
  const username = useWatch<FormValues, 'username'>({
    name: 'username',
    compute: (value) => value?.trim(),
  })

  // location : { lat, lng}

  console.log('username rerender', username)


  return (
    <div className='flex flex-col gap-2'>
      {/* Label */}
      <label htmlFor="username">Username</label>

      {/* Input */}
      <Input
        {...form.register('username', {
          required: {
            value: true,
            message: 'Username is required',
          },
          maxLength: {
            value: 10,
            message: 'Username must be less than 10 characters',
          },
          minLength: {
            value: 2,
            message: 'Username must be at least 2 characters',
          },
          // shouldUnregister: true,
          // disabled: true,
          // validate: async (value) => 'Username is not valid',
          // onChange: (e: React.ChangeEvent<HTMLInputElement>) => console.log(e.target.value),
          // onBlur: (e: React.FocusEvent<HTMLInputElement>) => console.log(e.target.value),
        })}
        type="text" id="username" />

      {/* Feedback */}
      {formState.errors.username && <p className='text-red-500 text-sm'>{formState.errors.username.message}</p>}
    </div>
  )
}
