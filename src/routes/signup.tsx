import AuthBase from '@/components/auth-base';
import { auth, db } from '@/config/firebase';
import { COLLECTIONS_NAME, USER_ROLE } from '@/config/firestore';
import { AuthInput } from '@/types';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';

export default function Signup() {
  const onSubmit = async ({ email, password }: AuthInput) => {
    if (!email || !password) return;

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    await addDoc(collection(db, COLLECTIONS_NAME.USERS), {
      uid: userCredential.user.uid,
      role: USER_ROLE.MEMBER,
    });
  };

  return <AuthBase type="signup" onSubmit={onSubmit} />;
}
