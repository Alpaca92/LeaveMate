import { StateCreator } from 'zustand';
import type { User } from '@/types';
interface MembersSlice {
  members: User[];
  setMembers: (data: User[]) => void;
}

const membersSlice: StateCreator<MembersSlice> = (set) => ({
  members: [],
  setMembers: (data) => {
    set({ members: [...data] });
  },
});

export type { MembersSlice };
export { membersSlice };
