import { Timestamp } from 'firebase/firestore';

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
  startDate: Timestamp;
  startMeridiem: string;
  endDate: Timestamp;
  endMeridiem: string;
}
export interface Request extends DateRange {
  approver: string;
  reason: string;
  userId: string;
  username: string;
  docId: string;
  status: 'pending' | 'completed' | 'rejected';
}
