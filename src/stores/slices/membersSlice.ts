import { StateCreator } from 'zustand';
import { db } from '@/config/firebase';
import { collection, getDocs, query } from 'firebase/firestore';
import { COLLECTIONS_NAME } from '@/config/config';
import { User } from '@/stores/types';
interface MembersSlice {
  members: User[];
  setMembers: () => void;
}

const membersSlice: StateCreator<MembersSlice> = (set) => ({
  members: [],
  setMembers: async () => {
    try {
      const membersList: User[] = [];

      const memberQuery = query(collection(db, COLLECTIONS_NAME.USERS));
      const membersSnapshot = await getDocs(memberQuery);

      membersSnapshot.forEach((doc) => {
        const { name, cc, role, approver } = doc.data();

        membersList.push({ name, cc, role, approver, userId: doc.id });
      });

      set({ members: membersList });
    } catch (error) {
      console.error(error);
    }
  },
});

export type { MembersSlice };
export { membersSlice };
