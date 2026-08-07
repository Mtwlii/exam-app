
import { Button } from '@/components/ui/button';
import { FieldLabel, Field, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { MapPin, RotateCcw } from 'lucide-react';
import { FormProvider, useForm, type SubmitHandler } from 'react-hook-form';

interface PricesFormValues {
  subtotal: number;
  profit: number;
  totalProfit: number;
  tax: number;
  total: number;
  location: {
    latitude: number;
    longitude: number;
  }
}

export default function PricesForm() {
  // Form
  const form = useForm<PricesFormValues>({
    defaultValues: {
      subtotal: 0,
      profit: 0,
      totalProfit: 0,
      tax: 0,
      total: 0,
    }
  })

  // Functions
  const onSubmit: SubmitHandler<PricesFormValues> = (values) => {
    console.log(values);
  }

  const reset = () => {
    console.log('reset');

    form.resetField('profit')

    // form.setValue('tax', 2, {})

    // form.reset({
    //   ...form.getValues(),
    //   subtotal: 100,
    // }, {
    //   keepErrors: true,
    // });
  }

  // const validate = () => {
  //   form.trigger(null, {})
  // }

  const calculateTotal = () => {
    const subtotal = form.getValues('subtotal');
    const profit = form.getValues('profit');

    // undefined / null / false / 0 / ''
    if (typeof subtotal !== 'number' || Number.isNaN(subtotal) || typeof profit !== 'number' || Number.isNaN(profit)) return;

    const total = subtotal + (subtotal * (profit / 100));

    form.setValue('total', total);
  }

  const getLocation = async () => {
    navigator.geolocation.getCurrentPosition((position) => {
      form.setValue('location', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      })
    })
  }

  return (
    <div className='flex flex-col gap-4'>
      <FormProvider {...form}>
        <form onSubmit={(e) => e.preventDefault()} className='flex flex-col gap-4'>
          {/* Subtotal */}
          <Field>
            {/* Label */}
            <FieldLabel htmlFor="subtotal">Subtotal</FieldLabel>

            {/* Input */}
            <Input
              type="number"
              id="subtotal"
              {...form.register('subtotal', {
                required: {
                  value: true,
                  message: 'Subtotal is required',
                },
                valueAsNumber: true,
                onChange: calculateTotal
              })}
            />
          </Field>

          {/* Profit */}
          <Field>
            {/* Label */}
            <FieldLabel htmlFor="profit">Profit (%)</FieldLabel>

            {/* Input */}
            <Input
              type="number"
              id="profit"
              {...form.register('profit', {
                required: {
                  value: true,
                  message: 'Profit is required',
                },
                valueAsNumber: true,
                onChange: calculateTotal
              })}
            />
          </Field>

          {/* Total */}
          <Field>
            {/* Label */}
            <FieldLabel htmlFor="total">Total</FieldLabel>

            {/* Input */}
            <Input
              readOnly
              type="number"
              id="total"
              {...form.register('total', {
                valueAsNumber: true,
              })}
            />
          </Field>

          {/* Location */}
          <FieldGroup className='grid grid-cols-2 gap-4'>
            {/* Latitude */}
            <Field>
              {/* Label */}
              <FieldLabel htmlFor="latitude">Latitude</FieldLabel>

              {/* Input */}
              <Input
                type="number"
                id="latitude"
                {...form.register('location.latitude', {
                  valueAsNumber: true,
                })}
              />
            </Field>

            {/* Longitude */}
            <Field>
              {/* Label */}
              <FieldLabel htmlFor="longitude">Longitude</FieldLabel>

              {/* Input */}
              <Input
                type="number"
                id="longitude"
                {...form.register('location.longitude', {
                  valueAsNumber: true,
                })}
              />
            </Field>
          </FieldGroup>
        </form>

        <div className='flex gap-2'>
          {/* Reset */}
          <Button onClick={reset} variant='outline' aria-label='Reset' type='button'>
            <RotateCcw />
          </Button>

          {/* Submit */}
          <Button onClick={form.handleSubmit(onSubmit)} className='grow'>Submit</Button>

          {/* Get Location */}
          <Button onClick={getLocation} variant='outline' aria-label='Get Location'>
            <MapPin />
          </Button>
        </div>
      </FormProvider>
    </div>

  )
}
