import { Link, useNavigate } from 'react-router-dom';
import * as styles from './auth-base.css';
import { useForm } from 'react-hook-form';
import { AuthInput } from '@/types';
import { useMemo, useState } from 'react';
import { UserCredential } from 'firebase/auth';

interface AuthBaseProps {
  type: 'login' | 'signup';
  onSubmit: ({ email, password }: AuthInput) => Promise<UserCredential | void>;
}

export default function AuthBase({ type, onSubmit }: AuthBaseProps) {
  const { register, handleSubmit } = useForm<AuthInput>();
  const [isLoading, setIsLoading] = useState(false);
  const navigator = useNavigate();
  const isLogin = useMemo(() => type === 'login', [type]);

  const _onSubmit = async (data: AuthInput) => {
    const { email, password } = data;

    try {
      setIsLoading(true);
      onSubmit && (await onSubmit({ email, password })); // TODO: Error 발생 시 해당 Error에 대한 toast 띄우기

      if (isLogin) {
        navigator('/');
      } else {
        navigator('/login');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <article className={styles.container}>
      <p>{isLogin ? 'Login' : 'Create Account'}</p>
      <form className={styles.form} onSubmit={handleSubmit(_onSubmit)}>
        <input
          {...register('email', {
            required: true,
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@t-win\.kr$/,
              message: 'Only company email addresses (*@t-win.kr) are allowed.',
            },
          })}
          placeholder="example@t-win.kr"
          type="email"
        />
        <input
          {...register('password', {
            required: true,
            minLength: {
              value: 6,
              message: 'Passwords must be at least 6 characters long.',
            },
          })}
          placeholder="password"
          type="password"
        />
        <button>
          {isLoading ? 'Loading...' : isLogin ? 'Login' : 'Signup'}
        </button>
      </form>
      {isLogin ? (
        <span>
          New to T-win? <Link to="/signup">Create an account</Link>
        </span>
      ) : (
        <span>
          Already have an account? <Link to="/login">Login</Link>
        </span>
      )}
    </article>
  );
}
