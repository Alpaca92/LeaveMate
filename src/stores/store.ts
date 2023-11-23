import { create } from 'zustand';
import {
  holidaysSlice,
  type HolidaysSlice,
} from '@/stores/slices/holidaysSlice';
import {
  currentUserSlice,
  type CurrentUserSlice,
} from '@/stores/slices/currentUserSlice';
import { membersSlice, type MembersSlice } from '@/stores/slices/membersSlice';
import {
  requestsSlice,
  type RequestsSlice,
} from '@/stores/slices/requestsSlice';
import { devtools } from 'zustand/middleware';

const RootStore = create<
  HolidaysSlice & CurrentUserSlice & MembersSlice & RequestsSlice
>()(
  devtools(
    (...args) => ({
      ...holidaysSlice(...args),
      ...currentUserSlice(...args),
      ...membersSlice(...args),
      ...requestsSlice(...args),
    }),
    { enabled: process.env.NODE_ENV === 'development' },
  ),
);

export default RootStore;
