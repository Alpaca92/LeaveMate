import { create } from 'zustand';
import { membersSlice } from '@/stores/slices/membersSlice';
import { currentUserSlice } from '@/stores/slices/currentUserSlice';
import type { MembersSlice } from '@/stores/slices/membersSlice';
import type { CurrentUserSlice } from '@/stores/slices/currentUserSlice';

const RootStore = create<MembersSlice & CurrentUserSlice>()((...args) => ({
  ...membersSlice(...args),
  ...currentUserSlice(...args),
}));

export default RootStore;
