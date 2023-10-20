import { ERROR_TYPES, REGEX } from '@/config/config';
import { auth } from '@/config/firebase';
import { useForm } from 'react-hook-form';
import Utils from './../utils/index';

interface ProfileInput {
  name: string;
  email: string;
  approver: string;
}

export default function Profile() {
  const user = auth.currentUser;
  const { register, handleSubmit } = useForm<ProfileInput>({
    defaultValues: {
      name: user?.displayName ?? '',
      email: user?.email ?? '',
    },
  });

  return (
    <article className="flex flex-col items-center justify-center">
      <div className="w-48 rounded-full border border-dark-background-main bg-light-background-secondary p-4 dark:border-light-background-main dark:bg-dark-background-secondary">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="stroke-light-background-accent stroke-1 dark:stroke-dark-background-accent"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
          />
        </svg>
      </div>
      <form className="mt-10 flex w-4/5 flex-col space-y-4 text-light-text-main">
        <input
          className="rounded-lg px-3 py-2 focus:outline-none"
          required
          placeholder="성이름"
          type="text"
          {...register('name', {
            required: true,
            minLength: 2,
          })}
        />
        <input
          className="rounded-lg px-3 py-2 focus:outline-none"
          required
          placeholder="exam@t-win.kr"
          type="email"
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
        {/*TODO: approver는 USER_ROLE 1, 2중에 선택할 수 있도록 popup 형태로 구현 */}
        <input
          className="rounded-lg px-3 py-2 focus:outline-none"
          required
          placeholder="성이름"
          type="text"
          {...register('approver', {
            required: true,
          })}
        />
      </form>
    </article>
  );
}
