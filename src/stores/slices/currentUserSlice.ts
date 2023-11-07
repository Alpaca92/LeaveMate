import { auth, db } from '@/config/firebase';
import { User } from '@/stores/types';
import { doc, getDoc } from 'firebase/firestore';
import { StateCreator } from 'zustand';
import { COLLECTIONS_NAME } from '@/config/config';

interface CurrentUserSlice {
  currentUser: User;
  setCurrentUser: () => void;
}

const currentUserSlice: StateCreator<CurrentUserSlice> = (set) => ({
  currentUser: {} as User,
  setCurrentUser: async () => {
    try {
      const user = auth.currentUser;
      const docSnapshot = await getDoc(
        doc(db, COLLECTIONS_NAME.USERS, user?.uid ?? ''),
      );

      if (docSnapshot.exists()) {
        const userId = docSnapshot.id;
        const { role, cc, name, approver } = docSnapshot.data();

        set({ currentUser: { userId, role, cc, name, approver } });
      }
    } catch (error) {
      console.error(error);
    }
  },
});

export type { CurrentUserSlice };
export { currentUserSlice };
