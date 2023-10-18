import AuthBase from '@/components/auth-base';
import { auth } from '@/firebase';
import { AuthInput } from '@/types';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function Signup() {
  const onSubmit = async ({ email, password }: AuthInput) =>
    await createUserWithEmailAndPassword(auth, email, password);

  return <AuthBase type="signup" onSubmit={onSubmit} />;
}
