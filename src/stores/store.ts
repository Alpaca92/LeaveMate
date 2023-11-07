import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { membersSlice } from '@/stores/slices/membersSlice';
import { currentUserSlice } from '@/stores/slices/currentUserSlice';
import type { MembersSlice } from '@/stores/slices/membersSlice';
import type { CurrentUserSlice } from '@/stores/slices/currentUserSlice';

const RootStore = create<MembersSlice & CurrentUserSlice>()((...a) => ({
  ...membersSlice(...a),
  ...currentUserSlice(...a),
}));

export default RootStore;
