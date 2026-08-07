
import { useActionState, useState, } from 'react';
import { useFormStatus, useFormState } from 'react-dom';

async function updateName(previousState, formData) {
  const name = formData.get('name');
  const error = await updateNameOnServer(name);
  if (error) {
    return error; // becomes the new "state"
  }
  redirect('/profile');
  return null;
}

function EditName() {
  const [error, submitAction, isPending] = useActionState(updateName, null);
  const [state, action] = useFormState(updateName, null)


  return (
    <form action={action}>
      <input type="text" name="name" />
      <button type="submit" disabled={isPending}>Update</button>
      <SubmitButton />
      {error && <p>{error}</p>}
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return <button type="submit" disabled={pending}>Update</button>
}