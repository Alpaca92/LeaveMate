import { StateCreator } from 'zustand';
import type { User } from '@/types';

interface CurrentUserSlice {
  currentUser: User;
  setCurrentUser: (data: User) => void;
  updateCurrentUser: <T extends Partial<User>>(data: T) => void;
}

const currentUserSlice: StateCreator<CurrentUserSlice> = (set) => ({
  currentUser: {} as User,
  setCurrentUser: (data) => {
    set({ currentUser: { ...data } });
  },
  updateCurrentUser: (data) => {
    set((state) => ({ currentUser: { ...state.currentUser, ...data } }));
  },
});

export type { CurrentUserSlice };
export { currentUserSlice };
