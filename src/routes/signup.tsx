import {
  COLLECTIONS_NAME,
  ERROR_TYPES,
  PATH_NAME,
  REGEX,
  USER_ROLES,
} from '@/config/config';
import { auth, db } from '@/config/firebase';
import Utils from '@/utils';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

interface SignupInput {
  name: string;
  email: string;
  password: string;
}

export default function Signup() {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit } = useForm<SignupInput>();
  const navigator = useNavigate();

  const onSubmit = async (data: SignupInput) => {
    const { name, email, password } = data;

    if (!name || !email || !password) return;

    try {
      setIsLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      await updateProfile(userCredential.user, {
        displayName: name,
      });

      await setDoc(
        doc(collection(db, COLLECTIONS_NAME.USERS), userCredential.user.uid),
        {
          name,
          email,
          role: USER_ROLES.MEMBER,
          cc: false,
        },
      );

      await auth.signOut();

      navigator(PATH_NAME.LOGIN);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <article className="flex w-full flex-col items-center justify-center">
      <p className="text-4xl font-extrabold">Create Account</p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-10 flex w-4/5 flex-col space-y-4 text-light-text-main"
      >
        <input
          className="rounded-lg px-4 py-2 focus:outline-none"
          required
          type="text"
          placeholder="성이름"
          {...register('name', {
            required: true,
            minLength: 2,
          })}
        />
        <input
          className="rounded-lg px-3 py-2 focus:outline-none"
          required
          type="email"
          placeholder="exam@t-win.kr"
          {...register('email', {
            required: true,
            pattern: {
              value: REGEX.EMAIL,
              message: Utils.getErrorMessage(
                ERROR_TYPES.COMMON.EMAIL_VALIDATION,
              ),
            },
          })}
        />
        <input
          className="rounded-lg px-3 py-2 focus:outline-none"
          required
          type="password"
          placeholder="password"
          {...register('password', {
            required: true,
            minLength: {
              value: 6,
              message: Utils.getErrorMessage(
                ERROR_TYPES.COMMON.PASSWORD_VALIDATION,
              ),
            },
          })}
        />
        <button
          disabled={isLoading}
          className="!mt-10 rounded-lg bg-light-text-main py-3 font-semibold dark:bg-dark-text-main"
        >
          {isLoading ? 'Loading...' : 'Signup'}
        </button>
      </form>
      <span className="mt-3 italic text-light-text-secondary dark:text-dark-text-secondary">
        Already have an account?{' '}
        <Link
          to="/login"
          className="text-light-text-accent dark:text-dark-text-accent"
        >
          Login
        </Link>
      </span>
    </article>
  );
}
