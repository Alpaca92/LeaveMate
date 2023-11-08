export interface LoginInput {
  email: string;
  password: string;
}
export interface User {
  userId: string;
  name: string;
  cc: boolean;
  role: number;
  approver?: string;
}
