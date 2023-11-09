import Utils from '@/utils';
import { useCallback } from 'react';
import { FieldErrors } from 'react-hook-form';
import {
  Theme,
  ToastContainer,
  ToastContainerProps,
  toast,
} from 'react-toastify';

interface UseErrorToastProps {
  errors: FieldErrors;
}

type Notify = (message: string) => void;
type UseErrorToastResult = [
  () => void,
  React.ForwardRefExoticComponent<
    ToastContainerProps & React.RefAttributes<HTMLDivElement>
  >,
];

export default function UseErrorToast({
  errors,
}: UseErrorToastProps): UseErrorToastResult {
  console.log('useErrorToast is running !', errors);

  const notify: Notify = (message) => {
    toast.error(message, {
      position: toast.POSITION.TOP_RIGHT,
      theme: Utils.getTheme() as Theme,
    });
  };

  const notifies = () => {
    for (const key in errors) {
      const message = errors[key]?.message;

      console.log('inside custom hooks:', message);

      if (message !== undefined) notify(message.toString());
    }
  };

  return [notifies, ToastContainer];
}
