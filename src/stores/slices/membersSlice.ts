import { StateCreator } from 'zustand';
import { db } from '@/config/firebase';
import { collection, getDocs, query } from 'firebase/firestore';
import { COLLECTIONS_NAME } from '@/config/config';

interface Member {
  userId: string;
  name: string;
  cc: boolean;
  role: number;
  approver?: string;
}

interface MembersSlice {
  members: Member[];
  setMembers: () => void;
}

const membersSlice: StateCreator<MembersSlice> = (set) => ({
  members: [],
  setMembers: async () => {
    try {
      const membersList: Member[] = [];

      const memberQuery = query(collection(db, COLLECTIONS_NAME.USERS));
      const membersSnapshot = await getDocs(memberQuery);

      membersSnapshot.forEach((doc) => {
        const { userId, cc, role, approver } = doc.data();

        membersList.push({ userId, cc, role, approver, name: doc.id });
      });

      set({ members: membersList });
    } catch (error) {
      console.error(error);
    }
  },
});

export type { MembersSlice };
export { membersSlice };
