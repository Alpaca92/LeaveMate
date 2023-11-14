import { COLLECTIONS_NAME } from '@/config/config';
import { auth, db } from '@/config/firebase';
import { collection, doc, getDoc, getDocs, query } from 'firebase/firestore';
import type { User } from '@/types';

export const fetchMembers = async () => {
  const membersList: User[] = [];

  try {
    const memberQuery = query(collection(db, COLLECTIONS_NAME.USERS));
    const membersSnapshot = await getDocs(memberQuery);

    membersSnapshot.forEach((doc) => {
      const { name, cc, role, approver } = doc.data();

      membersList.push({ name, cc, role, approver, userId: doc.id });
    });
  } catch (error) {
    console.error(error);
  }

  return membersList;
};

export const fetchCurrentUser = async () => {
  const currentUser = {} as User;

  try {
    const user = auth.currentUser;
    const docSnapshot = await getDoc(
      doc(db, COLLECTIONS_NAME.USERS, user?.uid ?? ''),
    );

    if (docSnapshot.exists()) {
      const userId = docSnapshot.id;
      const { role, cc, name, approver } = docSnapshot.data();

      Object.assign(currentUser, { userId, role, cc, name, approver });
    }
  } catch (error) {
    console.error(error);
  }

  return currentUser;
};
