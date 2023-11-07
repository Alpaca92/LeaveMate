import { create } from 'zustand';
import { membersSlice } from '@/stores/slices/membersSlice';
import type { MembersSlice } from '@/stores/slices/membersSlice';
import {
  CurrentUserSlice,
  currentUserSlice,
} from '@/stores/slices/currentUserSlice';

const RootStore = create<MembersSlice & CurrentUserSlice>()((...a) => ({
  ...membersSlice(...a),
  ...currentUserSlice(...a),
}));

export default RootStore;
