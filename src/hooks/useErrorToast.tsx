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

export default function UseErrorToast({
  errors,
}: UseErrorToastProps): [
  () => void,
  React.ForwardRefExoticComponent<
    ToastContainerProps & React.RefAttributes<HTMLDivElement>
  >,
] {
  const notify: Notify = useCallback((message) => {
    toast.error(message, {
      position: toast.POSITION.TOP_RIGHT,
      theme: Utils.getTheme() as Theme,
    });
  }, []);

  const notifies = useCallback(() => {
    for (const key in errors) {
      const message = errors[key]?.message;

      console.log('inside custom hooks:', message);

      if (message !== undefined)
        notify(Utils.getErrorMessage(message.toString()));
    }
  }, [errors, notify]);

  return [notifies, ToastContainer];
}
