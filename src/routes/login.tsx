import { ERROR_MESSAGES, PATH_NAME, REGEX } from '@/config/config';
import { auth } from '@/config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

interface SignupInput {
  email: string;
  password: string;
}

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit } = useForm<SignupInput>();
  const navigator = useNavigate();

  const onSubmit = async (data: SignupInput) => {
    const { email, password } = data;

    if (!email || !password) return;

    setIsLoading(true);

    try {
      const user = await signInWithEmailAndPassword(auth, email, password);

      console.log(user);
    } catch (error) {
      console.error(error);
    } finally {
      navigator(PATH_NAME.HOME);
      setIsLoading(false);
    }
  };

  return (
    <article className="flex w-full flex-col items-center justify-center">
      <p className="text-4xl font-extrabold">Login</p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-10 flex w-4/5 flex-col space-y-4 text-light-text-main"
      >
        <input
          className="rounded-lg px-3 py-2 focus:outline-none"
          required
          type="email"
          placeholder="exam@t-win.kr"
          {...register('email', {
            required: true,
            pattern: {
              value: REGEX.EMAIL,
              message: ERROR_MESSAGES.EMAIL_VALIDATION,
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
              message: ERROR_MESSAGES.PASSWORD_VALIDATION,
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
    </article>
  );
}
