export type UserRole = "ADMIN" | "SUPER_ADMIN" | "USER";

export interface IUser {
  id: string;
  username: string;
  email: string | null;
  phone: string | null;
  firstName: string;
  lastName: string;
  profilePhoto: string | null;
  emailVerified: boolean;
  phoneVerified: boolean;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}
