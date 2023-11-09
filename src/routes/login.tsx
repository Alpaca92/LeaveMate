import { ERROR_MESSAGES, PATH_NAME, REGEX } from '@/config/config';
import { auth } from '@/config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Utils from './../utils/index';
import { FirebaseError } from 'firebase/app';
import type { EmailAndPassword } from '@/types';
import UseErrorToast from '@/hooks/useErrorToast';

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitSuccessful },
    setError,
  } = useForm<EmailAndPassword>();
  const navigator = useNavigate();
  const [notifies, Toast] = useMemo(() => UseErrorToast({ errors }), [errors]);

  const onSubmit = async (data: EmailAndPassword) => {
    const { email, password } = data;

    if (!email || !password) return;

    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigator(PATH_NAME.HOME);
    } catch (error) {
      if (error instanceof FirebaseError) {
        const message = Utils.getErrorMessage(
          ERROR_MESSAGES.FIREBASE[error.code],
        );
        setError('root', { type: 'firebase', message });
      }
    } finally {
      setIsLoading(false);
    }
  };

  // FIXME: setError 후 정상적으로 error message출력하지 않음
  useEffect(() => {
    notifies();
  }, [notifies, errors]);

  console.log(errors);

  return (
    <article className="flex w-full flex-col items-center justify-center">
      <p className="text-4xl font-extrabold">Login</p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-10 flex w-4/5 flex-col space-y-4 text-light-text-main"
      >
        <input
          className="rounded-lg px-3 py-2 focus:outline-none"
          type="email"
          placeholder="exam@t-win.kr"
          {...register('email', {
            required: true,
            pattern: {
              value: REGEX.EMAIL,
              message: Utils.getErrorMessage(
                ERROR_MESSAGES.COMMON.EMAIL_VALIDATION,
              ),
            },
          })}
        />
        <input
          className="rounded-lg px-3 py-2 focus:outline-none"
          type="password"
          placeholder="password"
          {...register('password', {
            required: true,
            minLength: {
              value: 6,
              message: Utils.getErrorMessage(
                ERROR_MESSAGES.COMMON.PASSWORD_VALIDATION,
              ),
            },
          })}
        />
        <button
          disabled={isLoading}
          className="!mt-10 rounded-lg bg-light-text-main py-3 font-semibold dark:bg-dark-text-main"
        >
          {isLoading ? 'Loading...' : 'Login'}
        </button>
      </form>
      <span className="mt-3 italic text-light-text-secondary dark:text-dark-text-secondary">
        New to T-win?{' '}
        <Link
          to="/signup"
          className="text-light-text-accent dark:text-dark-text-accent"
        >
          Create an account
        </Link>
      </span>
      {errors && errors.root?.message}
      <Toast />
    </article>
  );
}
