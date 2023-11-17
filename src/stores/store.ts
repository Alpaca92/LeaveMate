import { create } from 'zustand';
import { membersSlice } from '@/stores/slices/membersSlice';
import { currentUserSlice } from '@/stores/slices/currentUserSlice';
import { requestsSlice } from '@/stores/slices/requestsSlice';
import type { MembersSlice } from '@/stores/slices/membersSlice';
import type { CurrentUserSlice } from '@/stores/slices/currentUserSlice';
import type { RequestsSlice } from '@/stores/slices/requestsSlice';
import { devtools } from 'zustand/middleware';

const RootStore = create<MembersSlice & CurrentUserSlice & RequestsSlice>()(
  devtools(
    (...args) => ({
      ...membersSlice(...args),
      ...currentUserSlice(...args),
      ...requestsSlice(...args),
    }),
    { enabled: process.env.NODE_ENV === 'development' },
  ),
);

export default RootStore;
