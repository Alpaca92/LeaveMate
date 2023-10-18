import AuthBase from '@/components/auth-base';
import { auth } from '@/firebase';
import { AuthInput } from '@/types';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function Login() {
  const onSubmit = async ({ email, password }: AuthInput) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };

  return <AuthBase type="login" onSubmit={onSubmit} />;
}
