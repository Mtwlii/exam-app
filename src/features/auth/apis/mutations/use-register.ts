import { useMutation } from "@tanstack/react-query";
import { registerMutationOptions } from "../auth.option";

export const useRegister = () => {
  return useMutation(registerMutationOptions());
};