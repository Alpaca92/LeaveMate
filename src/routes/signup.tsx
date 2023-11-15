import Button from '@/components/button';
import Input from '@/components/input';
import {
  COLLECTIONS_NAME,
  ERROR_MESSAGES,
  PATH_NAME,
  REGEX,
  USER_ROLES,
} from '@/config/config';
import { auth, db } from '@/config/firebase';
import type { EmailAndPassword } from '@/types';
import Utils from '@/utils';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

interface SignupInput extends EmailAndPassword {
  name: string;
}

export default function Signup() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInput>();
  const navigator = useNavigate();

  const onSignup = async (data: SignupInput) => {
    const { name, email, password } = data;

    if (!Utils.hasNoEmptyValues(data)) return;

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
        onSubmit={handleSubmit(onSignup)}
        className="mt-10 flex w-4/5 flex-col space-y-4 text-light-text-main"
      >
        <Input
          placeholder="성이름"
          register={register('name', {
            required: true,
            minLength: {
              value: 2,
              message: Utils.getErrorMessage(
                ERROR_MESSAGES.COMMON.NAME_LENGTH_VALIDATION,
              ),
            },
          })}
        />
        <Input
          type="email"
          placeholder="email"
          register={register('email', {
            required: true,
            pattern: {
              value: REGEX.EMAIL,
              message: Utils.getErrorMessage(
                ERROR_MESSAGES.COMMON.EMAIL_VALIDATION,
              ),
            },
          })}
        />
        <Input
          type="password"
          placeholder="password"
          register={register('password', {
            required: true,
            minLength: {
              value: 6,
              message: Utils.getErrorMessage(
                ERROR_MESSAGES.COMMON.PASSWORD_VALIDATION,
              ),
            },
          })}
        />
        <Button disabled={isLoading} className="!mt-10 py-3">
          {isLoading ? 'Loading...' : 'Signup'}
        </Button>
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
