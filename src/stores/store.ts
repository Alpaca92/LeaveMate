import { create } from 'zustand';
import { usersSlice } from '@/stores/slices/usersSlice';
import { membersSlice } from '@/stores/slices/membersSlice';
import type { UsersSlice } from '@/stores/slices/usersSlice';
import type { MembersSlice } from '@/stores/slices/membersSlice';

const RootStore = create<UsersSlice & MembersSlice>()((...a) => ({
  ...usersSlice(...a),
  ...membersSlice(...a),
}));

export default RootStore;
