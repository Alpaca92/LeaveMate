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
          <dialog className="absolute top-[20%] z-50 block h-1/2 w-4/5 rounded-3xl bg-light-background-main dark:bg-dark-background-main">
            {children}
          </dialog>
          <div
            onClick={onClose}
            className="fixed left-0 top-0 h-full w-full bg-gray-800 opacity-70"
          />
        </>,
        containerRef.current,
        PORTAL_KEYS.MODAL,
      )
    : null;
}
