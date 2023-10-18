import { Link, useNavigate } from 'react-router-dom';
import * as styles from './login.css';
import { useForm } from 'react-hook-form';
import { Auth } from '@/types';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase';
import { useState } from 'react';

export default function Login() {
  const { register, handleSubmit } = useForm<Auth>();
  const [isLoading, setIsLoading] = useState(false);
  const navigator = useNavigate();

  const _onSubmit = async (data: Auth) => {
    const { email, password } = data;

    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigator('/');
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <article className={styles.container}>
      <p>Login</p>
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
        <button>{isLoading ? 'Loading...' : 'Login'}</button>
      </form>
      <span>
        New to T-win? <Link to="/signup">Create an account</Link>
      </span>
    </article>
  );
}
