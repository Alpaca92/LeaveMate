import { PORTAL_KEYS } from '@/config/config';
import { useRef } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  children: React.ReactNode;
  element?: string;
  isShow: boolean;
  onClose: () => void;
}

export default function Modal({
  children,
  element = 'body',
  isShow = false,
  onClose,
}: ModalProps) {
  const containerRef = useRef(document.querySelector(element));

  return containerRef.current && isShow
    ? createPortal(
        <>
          <dialog className="absolute top-[45%] z-50 block w-4/5 translate-y-[-50%] rounded-3xl bg-light-background-main p-10 text-light-text-main shadow-2xl dark:bg-dark-background-main dark:text-dark-text-main">
            {children}
          </dialog>
          <div
            onClick={onClose}
            className="fixed left-0 top-0 h-full w-full bg-gray-900 opacity-70"
          />
        </>,
        containerRef.current,
        PORTAL_KEYS.MODAL,
      )
    : null;
}
