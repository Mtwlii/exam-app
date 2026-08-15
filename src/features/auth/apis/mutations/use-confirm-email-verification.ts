import { useMutation } from "@tanstack/react-query";
import { confirmEmailVerificationMutationOptions } from "../auth.option";

export const useConfirmEmailVerification = () => {
  return useMutation(confirmEmailVerificationMutationOptions());
};