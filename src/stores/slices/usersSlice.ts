import { StateCreator } from 'zustand';

interface User {
  name: string;
}

interface UsersSlice {
  users: User[];
}

const usersSlice: StateCreator<UsersSlice> = (set) => ({
  users: [],
});

export type { UsersSlice };
export { usersSlice };
