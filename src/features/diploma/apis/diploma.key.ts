/**
 * React Query stores each result in a cache in memory, and to distinguish each result from
 * another it uses a queryKey.
 * This file gathers all the diploma keys in one place instead of you manually typing them.
 */
export const DIPLOMA_QUERY_KEYS = {
  all: ["diploma"] as const,
  lists: (...filter: string[]) =>
    [...DIPLOMA_QUERY_KEYS.all, "list", ...filter] as const, //paginated must be fun
  details: (id: string) => [...DIPLOMA_QUERY_KEYS.all, "details", id] as const,
  create: (id: string) => [...DIPLOMA_QUERY_KEYS.all, "create", id] as const,
  update: (id: string) => [...DIPLOMA_QUERY_KEYS.all, "update", id] as const,
  delete: (id: string) => [...DIPLOMA_QUERY_KEYS.all, "delete", id] as const,
} as const;
