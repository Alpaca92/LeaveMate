import { StateCreator } from 'zustand';
import type { User } from '@/types';

interface CurrentUserSlice {
  currentUser: User;
  setCurrentUser: (data: User) => void;
}

const currentUserSlice: StateCreator<CurrentUserSlice> = (set) => ({
  currentUser: {} as User,
  setCurrentUser: (data) => {
    set({ currentUser: { ...data } });
  },
});

export type { CurrentUserSlice };
export { currentUserSlice };
