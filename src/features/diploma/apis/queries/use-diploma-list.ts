/**
 * This is a React Query hook that fetches the diploma list.
 * It uses the queryKey and queryFn from the api and key files (via diplomaListQueryOptions).
 */
import { useQuery } from "@tanstack/react-query";
import { diplomaListQueryOptions } from "../diploma.option";

export const useDiplomaList = (searchParams: URLSearchParams) => {
  return useQuery(diplomaListQueryOptions(searchParams));
};