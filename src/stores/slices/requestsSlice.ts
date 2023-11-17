import { StateCreator } from 'zustand';
import type { Request } from '@/types';

interface RequestsSlice {
  requests: Request[];
  setRequests: (data: Request[]) => void;
}

const requestsSlice: StateCreator<RequestsSlice> = (set) => ({
  requests: [],
  setRequests: (data) => {
    set({ requests: [...data] });
  },
});

export type { RequestsSlice };
export { requestsSlice };
