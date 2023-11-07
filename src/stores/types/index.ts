interface User {
  userId: string;
  name: string;
  cc: boolean;
  role: number;
  approver?: string;
}

export type { User };
