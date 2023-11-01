import { ERROR_TYPES, PATH_NAME, REGEX } from '@/config/config';
import { auth, storage } from '@/config/firebase';
import { useForm } from 'react-hook-form';
import Utils from './../utils/index';
import { useEffect, useState } from 'react';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import RootStore from '@/stores/store';
import { useShallow } from 'zustand/react/shallow';
import { R } from 'node_modules/@tanstack/react-query-devtools/build/modern/devtools-c71c5f06';
interface ProfileInput {
  name: string;
  email: string;
  approver: string;
}

export default function Profile() {
  const user = auth.currentUser;
  const navigator = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [avatarUrl, setAvartarUrl] = useState(user?.photoURL);
  const members = RootStore(
    useShallow((state) =>
      state.members.filter((member) => member.name !== user?.displayName),
    ),
  );

  const { register, handleSubmit } = useForm<ProfileInput>({
    defaultValues: {
      name: user?.displayName ?? '',
      email: user?.email ?? '',
      approver: '', // FIXME: 결재자를 한 번 선택하면 이를 기억함, 또한 profile에서 결재자를 선택하면 기안을 올릴 때 결재자가 자동으로 선택
    },
  });

  const onAvatarUpdate = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!user) return;

    const { files } = event.target;

    if (files && files.length === 1) {
      const file = files[0];
      const storageRef = ref(storage, `avatars/${user?.uid}`);
      const result = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(result.ref);

      setAvartarUrl(url);

      await updateProfile(user, {
        photoURL: url,
      });
    }
  };

  const onLogout = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      await auth.signOut();
      navigator(PATH_NAME.LOGIN);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log('members: ', members);
  }, [members]);

  return (
    <article className="flex flex-col items-center justify-center">
      <label
        htmlFor="avatar"
        className="flex h-48 w-48 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-light-background-secondary dark:border-light-background-main dark:bg-dark-background-secondary"
      >
        {avatarUrl ? (
          <img src={avatarUrl} />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="h-full w-full stroke-light-background-accent stroke-1 p-5 dark:stroke-dark-background-accent"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
        )}
      </label>
      <input
        id="avatar"
        className="hidden"
        type="file"
        accept="image/*"
        onChange={onAvatarUpdate}
      />
      <form className="mt-10 flex w-4/5 flex-col space-y-4 text-light-text-main">
        <input
          className="rounded-lg px-3 py-2 focus:outline-none"
          required
          placeholder="이름"
          type="text"
          {...register('name', {
            required: true,
            minLength: 2,
          })}
        />
        <input
          className="rounded-lg px-3 py-2 focus:outline-none"
          required
          placeholder="이메일"
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
        <select
          required
          className="h-10 rounded-lg px-3 py-2 focus:outline-none"
          {...register('approver', {
            required: true,
          })}
        >
          <option value="">결재자를 선택해주세요</option>
          {/* {approversList?.map((approver) => (
            <option key={approver.userId} value={approver.name}>
              {approver.name}
            </option>
          ))} */}
        </select>
        <button className="!mt-10 rounded-lg bg-light-text-main py-3 font-semibold dark:bg-dark-text-main">
          {isLoading ? 'Loading...' : 'Edit'}
        </button>
      </form>
      <button
        onClick={onLogout}
        className="mt-3 w-4/5 rounded-lg bg-light-text-main py-3 font-semibold text-dark-text-main dark:bg-dark-text-main dark:text-light-text-main"
      >
        Logout
      </button>
    </article>
  );
}
