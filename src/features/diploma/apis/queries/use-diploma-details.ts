import { useQuery } from "@tanstack/react-query";
import { diplomaDetailsQueryOptions } from "../diploma.option";

export default function useDiplomaDetails(id: string ) {
  return useQuery(diplomaDetailsQueryOptions(id));
}
