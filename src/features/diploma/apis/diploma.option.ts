/**
 * Here, the queryKey (from the key file) is combined with the queryFn (from the API file).
 * This makes the same settings reusable in more than one place (component, or even in the tests).
 */
import { getdiplomaApi, getDiplomaDetailsApi } from "./diploma.api";
import { DIPLOMA_QUERY_KEYS } from "./diploma.key";

export const diplomaListQueryOptions = (searchParams: URLSearchParams) => {
  const queryKeys = DIPLOMA_QUERY_KEYS.lists(
    ...Array.from(searchParams.entries()).map(
      ([key, value]) => `${key}:${value}`,
    ),
  );

  return {
    queryKey: queryKeys,
    queryFn: () => getdiplomaApi(searchParams),
  } as const;
};

export const diplomaDetailsQueryOptions = (id: string) => {
  const queryKeys = DIPLOMA_QUERY_KEYS.details(id);
  return {
    queryKey: queryKeys,
    queryFn: () => getDiplomaDetailsApi(id),
  } as const;
};