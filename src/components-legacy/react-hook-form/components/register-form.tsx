import { type SubmitHandler, useForm, type MultipleFieldErrors, type SubmitErrorHandler } from "react-hook-form";
import FieldFeedback from "./field-feedback";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GENDERS } from "../constants/gender.constant";
import { Controller } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxList, ComboboxItem, ComboboxTrigger, ComboboxValue } from "@/components/ui/combobox";
import type { RegisterFormValues } from "@/types/auth";
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema } from "@/schemas/auth.schema";
import { Label } from "@/components/ui/label";
import useRegister from "@/features/auth/apis/mutations/use-register";

const CLIENTS = [
  {
    id: 1,
    name: 'Yandex',
  },
  {
    id: 2,
    name: 'Google',
  },
  {
    id: 3,
    name: 'Meta',
  },
]

type IClient = typeof CLIENTS[number]

async function createUser(user: RegisterFormValues) {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return {
    code: 500,
    success: false,
    message: 'Internal server error',
  }

  return {
    code: 400,
    success: false,
    message: 'Validation error',
    errors: [
      {
        path: 'username',
        messages: ['Username is required'],
      },
      {
        path: 'email',
        messages: ['Email is required'],
      },
      {
        path: 'firstName',
        messages: ['First name is required'],
      },
      {
        path: 'lastName',
        messages: ['Last name is required'],
      },
      {
        path: 'password',
        messages: ['Password is required', 'Password must be at least 8 characters long', 'Password must contain at least one uppercase letter', 'Password must contain at least one lowercase letter', 'Password must contain at least one number', 'Password must contain at least one special character', 'Password must not contain the username'],
      },
      {
        path: 'confirmPassword',
        messages: ['Confirm password is required'],
      },
      {
        path: 'phone',
        messages: ['Phone is required'],
      },
    ]
  }

  return {
    code: 201,
    success: true,
    payload: {
      user
    }
  }
}

function convertErrorsToTypes(errors: string[], path: string) {
  const types: MultipleFieldErrors = {}

  errors.forEach((error, index) => {
    types[`${path}-${index}`] = error
  })

  return types
}

export default function RegisterForm() {
  // Mutations
  const { isPending, mutate: register } = useRegister();


  // Form
  const form = useForm<RegisterFormValues>({
    criteriaMode: 'all',
    resolver: zodResolver(registerSchema)
  });

  // Functions
  const onSubmit: SubmitHandler<RegisterFormValues> = async (values) => {
    register(values, {
      onError: (error) => {
        if (!response.success) {
          if (response.errors) response.errors.forEach(error => {
            const message = error.messages.length < 2 ? error.messages[0] : undefined;
            const types = error.messages.length > 1 ? convertErrorsToTypes(error.messages, error.path) : undefined;

            form.setError(error.path as keyof RegisterFormValues, {
              message,
              type: 'custom',
              types
            })
          })

          form.setError('form', {
            message: response.message,
            type: 'custom',
          })
        }
      },
      onSuccess: () => {
        // TODO: Add success message
      }
    })

  }

  const onError: SubmitErrorHandler<RegisterFormValues> = (errors) => {
    console.log(errors)
  }


  return (
    <form onSubmit={form.handleSubmit(onSubmit, onError)} className="rounded border p-4 min-h-96 w-80 mx-auto flex flex-col gap-2 m-8 text-start">
      {/* Username */}
      <div className="flex flex-col gap-2">
        {/* Label */}
        <Label htmlFor="username">Username</Label>

        {/* Input */}
        <Input type="text" id="username" {...form.register('username', { disabled: true })} />

        {/* Feedback */}
        <FieldFeedback error={form.formState.errors.username} />
      </div>

      {/* Email */}
      <div className="flex flex-col gap-2">
        {/* Label */}
        <Label htmlFor="email">Email</Label>

        {/* Input */}
        <Input type="text" id="email" {...form.register('email')} />

        {/* Feedback */}
        <FieldFeedback error={form.formState.errors.email} />
      </div>

      {/* First name */}
      <div className="flex flex-col gap-2">
        {/* Label */}
        <Label htmlFor="firstName">First Name</Label>

        {/* Input */}
        <Input type="text" id="firstName" {...form.register('firstName')} />

        {/* Feedback */}
        <FieldFeedback error={form.formState.errors.firstName} />
      </div>

      {/* Last name */}
      <div className="flex flex-col gap-2">
        {/* Label */}
        <Label htmlFor="lastName">Last Name</Label>

        {/* Input */}
        <Input type="text" id="lastName" {...form.register('lastName')} />

        {/* Feedback */}
        <FieldFeedback error={form.formState.errors.lastName} />
      </div>

      {/* Password */}
      <div className="flex flex-col gap-2">
        {/* Label */}
        <Label htmlFor="password">Password</Label>

        {/* Input */}
        <Input type="password" id="password" {...form.register('password')} />

        {/* Feedback */}
        <FieldFeedback error={form.formState.errors.password} />
      </div>

      {/* Confirm Password */}
      <div className="flex flex-col gap-2">
        {/* Label */}
        <Label htmlFor="confirmPassword">Confirm Password</Label>

        {/* Input */}
        <Input type="password" id="confirmPassword" {...form.register('confirmPassword')} />

        {/* Feedback */}
        <FieldFeedback error={form.formState.errors.confirmPassword} />
      </div>

      {/* Phone */}
      <div className="flex flex-col gap-2">
        {/* Label */}
        <Label htmlFor="phone">Phone</Label>

        {/* Input */}
        <Input type="tel" id="phone" {...form.register('phone')} />

        {/* Feedback */}
        <FieldFeedback error={form.formState.errors.phone} />
      </div>

      {/* Gender */}
      <div className="flex flex-col gap-2">
        {/* Label */}
        <Label htmlFor="gender">Gender</Label>

        {/* Input */}
        <Controller
          control={form.control}
          name="gender"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              {/* Trigger */}
              <SelectTrigger className="w-full" ref={field.ref}>
                <SelectValue className='capitalize' />
              </SelectTrigger>

              {/* Options */}
              <SelectContent>
                {Object.values(GENDERS).map((value) => (
                  <SelectItem key={value} value={value} className='capitalize'>
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />

        {/* Feedback */}
        <FieldFeedback error={form.formState.errors.gender} />
      </div>

      {/* Client */}
      <Controller
        control={form.control}
        name="client"
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel>Client</FieldLabel>

            {/* Field */}
            <Combobox
              itemToStringLabel={(item) => item.name}
              itemToStringValue={(item) => item.id}
              items={CLIENTS}
              value={field.value}
              onValueChange={field.onChange}
            >
              {/* Trigger */}
              <ComboboxTrigger ref={field.ref} render={<Button variant="outline" className="w-64 justify-between font-normal">
                <ComboboxValue />
              </Button>} />

              {/* Content */}
              <ComboboxContent>
                {/* Search */}
                {/* <ComboboxInput placeholder="Select a framework" /> */}

                {/* Empty */}
                <ComboboxEmpty>No items found.</ComboboxEmpty>

                {/* List */}
                <ComboboxList>
                  {(item: IClient) => (
                    <ComboboxItem key={item.id} value={item}>
                      {item.name}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>

            <FieldError>{fieldState.error?.message}</FieldError>
          </Field>
        )}
      />

      {/* Error */}
      {form.formState.errors.form && <p className="text-red-500 text-sm">{form.formState.errors.form.message}</p>}


      {/* Submit */}
      <Button type="submit" className="w-full"
        disabled={!form.formState.isValid && form.formState.isSubmitted}
      >Register</Button>
    </form>
  )
}
