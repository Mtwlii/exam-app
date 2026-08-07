

import { FormProvider, useForm, type SubmitHandler } from 'react-hook-form';
import type { FormValues } from './types/form';
import Username from './components/username';
import { useEffect } from 'react';
import { Input } from '@/components/ui/input';



export default function Login() {
  // const {isLoading} = useMutation()
  const form = useForm<FormValues>({
    // defaultValues: async () => {
    //   // fetch() ...

    //   return {
    //     username: 'John Doe',
    //     password: '123456',
    //     age: 18,
    //     birthday: '2000-01-01',
    //   }
    // }
    // disabled: isLoading,
    defaultValues: {
      username: '',
      password: '',
      age: 0,
      birthday: '',
    }
  });

  // const [value, setValue] = useState<string>('placeholder')
  // const inputRef = useRef<HTMLInputElement>(null)
  // const username = 'John Doe'

  // subtotal - 100
  // profit - 10 (%)
  // total - 110

  // const onSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
  //   e.preventDefault();

  //   const formData = new FormData(e.target);

  //   console.log('username: ', formData.get('username'))
  // }

  /**
   *
   * watch() => rerender the entire form when a value changes
   *  - rerenders the entire form, even if used local to a component
   *  - can subscribe to one, two or all fields
   *  - subscribes to the value only
   *
   * useWatch() => rerender the component when a value changes
   *  - rerenders the component when the value changes.
   *  - can subscribe to one, two or all fields
   *  - subscribes to the value only
   *
   * subscribe() => execute some logic when changes happen
   *  - does not rerender anything.
   *  - subscribes outside react.
   *  - must get unsubscribed
   *  - can subscribe to one, two or all fields
   *  - subscribes to the values, errors, touched, dirty, etc... (formState)
   *
   * useFormState() => rerender the component when a state changes
   *  - rerenders the component when the state changes.
   *  - can subscribe to one, two or all fields
   *  - subscribes to the form state only (formState)
   */




  // const username = form.watch('username')
  // const [username, password] = form.watch(['username', 'password'])
  // const values = form.watch()

  // useEffect(() => {
  //   const subscribe = form.watch((values, info) => {
  //     // subtotal
  //     // profit
  //     // total

  //     if (info.name === 'subtotal') {
  //       form.setValue('total', (values.profit / 10) * values.subtotal)
  //     }
  //     console.log('values: ', values)
  //     console.log('info: ', info)
  //   });

  //   return () => subscribe.unsubscribe();
  // }, [form])

  useEffect(() => {
    const unsubscribe = form.subscribe({
      name: 'username',
      formState: { values: true },
      callback: async ({ values }) => {
        console.log('values: ', values)
      }
    })

    return () => unsubscribe();
  }, [form])

  // console.log('form rerender', form.formState.isValidating)
  // console.log('form rerender', form.formState.validatingFields)
  // console.log('form rerender', form.formState.isValid)
  // console.log('form rerender', form.formState.isLoading)
  // console.log('form rerender', form.formState.isReady)
  // console.log('form rerender', form.formState.isSubmitting)
  // console.log('form rerender', form.formState.isSubmitSuccessful)
  // console.log('form rerender', form.formState.isSubmitted)
  // console.log('form.formState.dirtyFields', form.formState.dirtyFields)
  // console.log('form.formState.touchedFields', form.formState.touchedFields)
  // console.log('form.formState.isDirty', form.formState.isDirty)



  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    console.log('values: ', values)

    // const formattedDate = format(values.birthday, 'mm-dd-yyyy')
  }

  //! Decide between controlled and uncontrolled inputs
  //! register nested fields

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='rounded border p-4 min-h-96 w-80 mx-auto flex flex-col gap-2 m-8 bg-zinc-800 text-start'
      >
        {/* Username */}
        <Username />

        {/* Password */}
        <div className='flex flex-col gap-2'>
          {/* Label */}
          <label htmlFor="password">Password</label>

          {/* Input */}
          <Input
            {...form.register('password', {
              required: {
                value: true,
                message: 'Password is required',
              },
              pattern: {
                value: /^[a-zA-Z0-9]+$/,
                message: 'Password must contain only letters and numbers',
              },
              validate: async (value) => {
                return value.length > 8 ? 'Password must be at least 8 characters' : true
              }
            })}
            type="password" id="password" />

          {/* Feedback */}
          {form.formState.errors.password && <p className='text-red-500 text-sm'>{form.formState.errors.password.message}</p>}
        </div>

        {/* Age */}
        <div className='flex flex-col gap-2'>
          {/* Label */}
          <label htmlFor="age">Age</label>

          {/* Input */}
          <Input
            type="number"
            {...form.register('age', {
              required: {
                value: true,
                message: 'Age is required',
              },
              min: {
                value: 18,
                message: 'Age must be at least 18',
              },
              max: {
                value: 100,
                message: 'Age must be less than 100',
              },
              // setValueAs: (value: number | undefined) => value ? Number(value) : undefined
              valueAsNumber: true,
            })}
            id="age" />

          {/* Feedback */}
          {form.formState.errors.age && <p className='text-red-500 text-sm'>{form.formState.errors.age.message}</p>}
        </div>

        {/* Birthday */}
        <div className='flex flex-col gap-2'>
          {/* Label */}
          <label htmlFor="birthday">Birthday</label>

          {/* Input */}
          <Input
            type="date"
            {...form.register('birthday', {
              // setValueAs: (value: string | undefined) => value ? new Date(value) : undefined,
              valueAsDate: true,
            })}
            id="birthday"
          />

          {/* Feedback */}
          {form.formState.errors.birthday && <p className='text-red-500 text-sm'>{form.formState.errors.birthday.message}</p>}
        </div>

        {/* Submit */}
        <button
          // disabled={isLoading}
          disabled={!form.formState.isValid && form.formState.isSubmitted}
          type='submit' className='bg-blue-500 text-white rounded-md p-2 mt-auto disabled:bg-gray-500 disabled:cursor-not-allowed'>Login</button>

        {/* Examples */}
        {/* <Input ref={inputRef} type="text" onChange={(e) => console.log(e.target.value)} />
      <Input type="text" />
      <textarea name="" id="" defaultValue={username}></textarea>
      <select name="" id="" value={username} onChange={(e) => console.log(e.target.value)}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select> */}
      </form>
    </FormProvider>
  )
}
