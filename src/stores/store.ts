import { create } from 'zustand';
import { membersSlice } from '@/stores/slices/membersSlice';
import { currentUserSlice } from '@/stores/slices/currentUserSlice';
import type { MembersSlice } from '@/stores/slices/membersSlice';
import type { CurrentUserSlice } from '@/stores/slices/currentUserSlice';
import { devtools } from 'zustand/middleware';

const RootStore = create<MembersSlice & CurrentUserSlice>()(
  devtools(
    (...args) => ({
      ...membersSlice(...args),
      ...currentUserSlice(...args),
    }),
    { enabled: process.env.NODE_ENV === 'development' },
  ),
);

export default RootStore;
