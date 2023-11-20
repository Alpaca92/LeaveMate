import {
  COLLECTIONS_NAME,
  ERROR_MESSAGES,
  PATH_NAME,
  QUERY_KEYS,
  REGEX,
} from '@/config/config';
import { auth, db, storage } from '@/config/firebase';
import { useForm } from 'react-hook-form';
import Utils from './../utils/index';
import { useEffect, useState } from 'react';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';
import RootStore from '@/stores/store';
import { collection, doc, updateDoc } from 'firebase/firestore';
import { FirebaseError } from 'firebase/app';
import { Theme, ToastContainer, toast } from 'react-toastify';
import Input from '@/components/input';
import Button from '@/components/button';
import ThemeSwitch from '@/components/theme-switch';
import { useMutation } from '@tanstack/react-query';
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
  const { currentUser, updateCurrentUser } = RootStore(
    useShallow((state) => ({
      currentUser: state.currentUser,
      updateCurrentUser: state.updateCurrentUser,
    })),
  );
  const members = RootStore(
    useShallow((state) =>
      state.members.filter(
        (member) =>
          member.name !== user?.displayName && member.role < currentUser.role,
      ),
    ),
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProfileInput>({
    defaultValues: {
      name: user?.displayName ?? '',
      email: user?.email ?? '',
      approver: currentUser.approver ?? '',
    },
  });

  const notify = (message: string) => {
    toast.error(message, {
      position: toast.POSITION.TOP_RIGHT,
      theme: Utils.getTheme() as Theme,
    });
  };

  const { mutateAsync } = useMutation({
    mutationKey: [QUERY_KEYS.FIRESTORE, QUERY_KEYS.CURRENT_USER],
    mutationFn: async ({ approver, email, name }: ProfileInput) => {
      try {
        await updateDoc(
          doc(collection(db, COLLECTIONS_NAME.USERS), currentUser.userId),
          {
            name,
            email,
            approver,
          },
        );
      } catch (error) {
        console.error(error);
      }
    },
    onSuccess: (_, { approver }) => {
      updateCurrentUser({ approver });
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

  const onProfileUpdate = async (data: ProfileInput) => {
    if (!Utils.hasNoEmptyValues(data)) return;

    try {
      setIsLoading(true);
      await mutateAsync(data);
    } catch (error) {
      console.error(error);

      if (error instanceof FirebaseError) {
        const message = Utils.getErrorMessage(
          ERROR_MESSAGES.FIREBASE[error.code],
        );
        notify(message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onLogout = async (event: React.MouseEvent<HTMLButtonElement>) => {
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
    if (currentUser.approver !== undefined) {
      setValue('approver', currentUser.approver ?? '');
    }
  }, [setValue, currentUser.approver]);

  return (
    <article className="flex w-4/5 flex-col items-center justify-center justify-self-center">
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
      <form
        className="mt-10 flex w-full flex-col space-y-4 text-light-text-main"
        onSubmit={handleSubmit(onProfileUpdate)}
      >
        <Input
          placeholder="이름"
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
          placeholder="이메일"
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
        <select
          className="h-10 rounded-lg px-3 py-2 focus:outline-none"
          {...register('approver', {
            required: {
              value: true,
              message: Utils.getErrorMessage(
                ERROR_MESSAGES.COMMON.APPROVER_VALIDATION,
              ),
            },
          })}
        >
          <option value="">결재자를 선택해주세요</option>
          {members.map((member) => (
            <option key={member.userId} value={member.name}>
              {member.name}
            </option>
          ))}
        </select>
        <Button disabled={isLoading} className="!mt-10 py-3">
          {isLoading ? 'Loading...' : 'Update'}
        </Button>
      </form>
      <div className="mt-3 flex w-full items-center justify-between gap-x-2">
        <ThemeSwitch className="h-full" />
        <Button onClick={onLogout} className="grow py-3">
          Logout
        </Button>
      </div>
      <ToastContainer />
    </article>
  );
}
