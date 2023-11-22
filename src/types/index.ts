export interface EmailAndPassword {
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
export interface DateRange {
  startDate: number;
  startMeridiem: string;
  endDate: number;
  endMeridiem: string;
}
export interface Request extends DateRange {
  createdAt: number;
  approver: string;
  reason: string;
  userId: string;
  username: string;
  docId: string;
  status: 'pending' | 'approve' | 'rejected';
}

export interface YearAndMonth {
  year: number;
  month: number;
}
