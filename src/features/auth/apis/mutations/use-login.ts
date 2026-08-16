import { useMutation } from "@tanstack/react-query";
import { loginMutationOptions } from "../auth.option";

export const useLogin = () => {
  return useMutation(loginMutationOptions());
};