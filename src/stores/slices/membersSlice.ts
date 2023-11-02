import { StateCreator } from 'zustand';
import { db } from '@/config/firebase';
import { collection, getDocs, query } from 'firebase/firestore';
import { COLLECTIONS_NAME } from '@/config/config';

interface Member {
  userId: string;
  name: string;
  cc: boolean;
  role: number;
}

interface MembersSlice {
  members: Member[];
  setMembers: () => void;
}

const membersSlice: StateCreator<MembersSlice> = (set) => ({
  members: [],
  setMembers: async () => {
    const membersList: Member[] = [];

    const approverQuery = query(collection(db, COLLECTIONS_NAME.USERS));
    const approverSnapshot = await getDocs(approverQuery);

    approverSnapshot.forEach((doc) => {
      const { userId, cc, role } = doc.data();

      membersList.push({ userId, cc, role, name: doc.id });
    });

    set({ members: membersList });
  },
});

export type { MembersSlice };
export { membersSlice };
