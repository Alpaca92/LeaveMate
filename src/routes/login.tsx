import * as styles from './login.css';

export default function Login() {
  return (
    <article className={styles.container}>
      <p>Login</p>
      <form className={styles.form}>
        <input />
        <input />
        <button>Login</button>
      </form>
    </article>
  );
}
