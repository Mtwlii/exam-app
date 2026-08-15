# Exam App — Project Conventions

React + TypeScript exam/diploma platform. Follow this exact project structure and these conventions for ALL code generated.

## Tech Stack
- React + TypeScript
- TanStack React Query (`@tanstack/react-query`) for server state
- Feature-based folder architecture
- i18n support (multi-language)

## Folder Structure

```
public/
  assets/
    fonts/
    images/
    logo/

src/
  assets/                # static files (images, fonts, etc.)
  i18n/                  # translation setup
    languages/           # e.g. en, ar
    config...
  features/
    <feature-name>/      # e.g. diploma, exam, question, user, auth
      apis/
        mutations/       # POST/PUT/PATCH/DELETE hooks (use-*.ts)
        queries/         # GET hooks (use-*.ts)
        <feature>.api.ts     # raw fetch functions, NO React Query logic
        <feature>.key.ts     # centralized React Query key factory
        <feature>.option.ts  # queryOptions/mutationOptions factories
      components/        # components scoped to this feature only
      hooks/              # feature-specific hooks (non data-fetching)
      types/               # TypeScript types/interfaces for this feature
  shared/
    components/          # shared/reusable UI (buttons, inputs, etc.)
    hooks/                # shared hooks
    utils/                # shared utility functions
    types/                # shared TypeScript types
    lib/                  # shared config/lib setup
  app/
    routes/               # routing setup
    providers/            # QueryClientProvider, AuthProvider, etc.
    layout/                # app shell/layout components
    guards/                # route guards (auth, role-based)
  schemas/                # validation schemas (e.g. Zod)
  App.tsx
  App.css
  index.css
  main.tsx
```

## Data-Fetching Pattern (MANDATORY for every feature)

Each feature's `apis/` folder follows this exact 3-layer separation:

**1. `<feature>.api.ts`** — raw fetch functions only, no React Query
```typescript
export async function getXListApi(params: URLSearchParams) {
  const response = await fetch("/api/x?" + params.toString());
  const payload = await response.json();
  if (!payload.status) throw new Error("Failed to fetch X list");
  return payload;
}
```

**2. `<feature>.key.ts`** — centralized query key factory
```typescript
export const X_QUERY_KEYS = {
  all: ["x"] as const,
  list: (...filter: string[]) => [...X_QUERY_KEYS.all, "list", ...filter] as const,
  details: (id: string) => [...X_QUERY_KEYS.all, "detail", id] as const,
} as const;
```

**3. `<feature>.option.ts`** — connects keys + api into queryOptions
```typescript
export const xListQueryOptions = (searchParams: URLSearchParams) => {
  const queryKeys = X_QUERY_KEYS.list(
    ...Array.from(searchParams.entries()).map(([key, value]) => `${key}:${value}`)
  );
  return {
    queryKey: queryKeys,
    queryFn: () => getXListApi(searchParams),
  } as const;
};
```

**4. `apis/queries/use-x-list.ts`** — final hook, thin wrapper
```typescript
export const useXList = (searchParams: URLSearchParams) => {
  return useQuery(xListQueryOptions(searchParams));
};
```

Mutations follow the same layered idea but live in `apis/mutations/` and use `useMutation`.

## Backend API Endpoints (base path `/api`)

### Auth `/api/auth`
- POST `/auth/send-email-verification` — send OTP (step 1 before registration)
- POST `/auth/confirm-email-verification` — confirm OTP
- POST `/auth/register` — register (email must be verified first)
- POST `/auth/login` — login with username
- POST `/auth/forgot-password` — request password reset
- POST `/auth/reset-password` — reset password using token

### Users `/api/users` (auth required)
- GET `/users/profile`
- PATCH `/users/profile` (firstName, lastName, profilePhoto, phone)
- POST `/users/change-password`
- POST `/users/email/request`
- POST `/users/email/confirm`
- DELETE `/users/account` (disabled for super admin)

### Diplomas `/api/diplomas` (paginated, search on title/description)
- GET `/diplomas`
- POST `/diplomas` (Admin only)
- GET `/diplomas/{id}`
- PUT `/diplomas/{id}` (Admin only)
- DELETE `/diplomas/{id}` (Admin only)

### Exams `/api/exams` (paginated, filter by diploma + search)
- GET `/exams`
- POST `/exams` (Admin only)
- GET `/exams/{id}`
- PUT `/exams/{id}` (Admin only)
- DELETE `/exams/{id}` (Admin only)

### Questions `/api/questions` (sort + search on text/answers)
- GET `/questions/exam/{examId}`
- POST `/questions/exam/{examId}` (Admin only)
- POST `/questions/exam/{examId}/bulk` (Admin only)
- GET `/questions/{id}`
- PUT `/questions/{id}` (Admin only)
- DELETE `/questions/{id}` (Admin only)
- POST `/questions` (examId in body, Admin only)

### Submissions `/api/submissions` (paginated, search on exam title)
- POST `/submissions` — submit exam answers
- GET `/submissions` — current user's submissions
- GET `/submissions/{id}` — submission details + analytics

### Admin `/api/admin`
- GET `/admin/audit-logs`
- DELETE `/admin/audit-logs`
- GET `/admin/audit-logs/{id}`
- DELETE `/admin/audit-logs/{id}`
- GET `/admin/users`
- POST `/admin/seed`
- PATCH `/admin/diplomas/{id}/immutable` (SUPER_ADMIN only)
- PATCH `/admin/exams/{id}/immutable` (SUPER_ADMIN only)
- PATCH `/admin/questions/{id}/immutable` (SUPER_ADMIN only)
- PATCH `/admin/users/{id}/immutable` (SUPER_ADMIN only)

### Health
- GET `/health`

### Upload
- Image upload (temp cache for diploma, exam, profile photo) — endpoint details TBD

## Instructions for the AI
1. Always place new code in the correct folder per the structure above.
2. Never mix raw fetch logic with React Query logic — always split across `.api.ts` / `.key.ts` / `.option.ts` / hook files.
3. Match endpoint paths EXACTLY to the list above — do not invent or guess endpoint URLs.
4. Reuse existing query key factories for cache invalidation instead of hardcoding keys.
5. Keep feature folders self-contained; only put truly cross-feature code in `shared/`.
6. Ask for clarification if a requested feature/endpoint isn't listed above instead of guessing.
