import { Button } from "@/components/ui/button";
import { FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { validateNumber } from "@/schemas/auth.schema";
import { Plus, Trash } from "lucide-react";
import { FormProvider, useFieldArray, useForm, type SubmitHandler, Controller } from "react-hook-form";

// let test: unknown = 2;
// const testTwo: number = test as number;

interface FormValues {
  items: {
    name: string;
    price: number;
    quantity: number;
  }[];
}

const DEMOITEMS = [
  {
    name: 'Item 1',
    price: 100,
    quantity: 1,
  },
  {
    name: 'Item 2',
    price: 200,
    quantity: 2,
  },
]

export default function CartForm() {
  // Form
  const form = useForm<FormValues>({
    defaultValues: {
      items: DEMOITEMS,
    }
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'items',
  })

  // Functions
  const onSubmit: SubmitHandler<FormValues> = (values) => {
    console.log(values);
  }



  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-2 p-4'>
        {/* Header */}
        <header className="flex justify-between items-center pb-4 border-b">
          {/* Title */}
          <h1 className='text-2xl font-bold text-center'>Cart</h1>

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              type="button"
              size="icon"
              onClick={() => append({
                name: '',
                price: 0,
                quantity: 0,
              })}
              aria-label="Add item">
              <Plus />
            </Button>
          </div>
        </header>

        {/* Items */}
        <div className="flex flex-col gap-6">
          {fields.map((field, index) => (
            <FieldSet key={field.id} className="flex-row items-center">
              {/* Name */}
              <FieldGroup>
                {/* Label */}
                <FieldLabel>Item</FieldLabel>

                {/* Input */}
                <Controller
                  control={form.control}
                  name={`items.${index}.name`}
                  render={({ field }) => <Input {...field} />}
                />
              </FieldGroup>

              {/* Price */}
              <FieldGroup>
                {/* Label */}
                <FieldLabel>Price</FieldLabel>

                {/* Input */}
                <Controller
                  control={form.control}
                  name={`items.${index}.price`}
                  render={({ field }) => <Input {...field} />}
                />
              </FieldGroup>

              {/* Quantity */}
              <FieldGroup>
                {/* Label */}
                <FieldLabel>Quantity</FieldLabel>

                {/* Input */}
                <Controller
                  control={form.control}
                  name={`items.${index}.quantity`}
                  render={({ field }) => <Input {...field} />}
                />
              </FieldGroup>

              {/* Remove */}
              <Button
                type="button"
                size="icon"
                variant="destructive"
                onClick={() => remove(index)}
                aria-label="Remove item"
              ><Trash /></Button>
            </FieldSet>
          ))}
        </div>


        {/* Submit */}
        <Button type="submit">Submit</Button>
      </form>
    </FormProvider>
  )
}
