import { create } from 'zustand';
import { membersSlice } from '@/stores/slices/membersSlice';
import type { MembersSlice } from '@/stores/slices/membersSlice';

const RootStore = create<MembersSlice>()((...a) => ({
  ...membersSlice(...a),
}));

export default RootStore;
