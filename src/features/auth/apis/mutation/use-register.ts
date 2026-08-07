import { useMutation } from "@tanstack/react-query";
import { registerApi } from "../auth.api";

export default function useRegister() {
 return useMutation({
    mutationFn: registerApi,
  });
}