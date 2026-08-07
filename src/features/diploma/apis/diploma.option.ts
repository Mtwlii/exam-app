/**
 * Here, the queryKey (from the key file) is combined with the queryFn (from the API file).
 * This makes the same settings reusable in more than one place (component, or even in the tests).
 */
import { getDiplomaListApi } from "./diploma.api";
import { DIPLOMA_QUERY_KEYS } from "./diploma.key";

export const diplomaListQueryOptions = (searchParams: URLSearchParams) => {
  const queryKeys = DIPLOMA_QUERY_KEYS.list(
    ...Array.from(searchParams.entries()).map(
      ([key, value]) => `${key}:${value}`,
    ),
  );

  return {
    queryKey: queryKeys,
    queryFn: () => getDiplomaListApi(searchParams),
  } as const;
};