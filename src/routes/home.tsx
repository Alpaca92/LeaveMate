import { useEffect, useState } from 'react';
import Modal from '@/components/modal';
import RequestModal from '@/components/request-modal';
import RootStore from '@/stores/store';

export default function Home() {
  const [isShow, setIsShow] = useState<boolean>(false);
  const { members, setMembers } = RootStore();

  const onClick = () => {
    setIsShow(true);
  };

  const onClose = () => {
    setIsShow(false);
  };

  useEffect(() => {
    setMembers();
  }, [setMembers]);

  return (
    <article className="relative">
      <button
        onClick={onClick}
        className="fixed bottom-[13%] right-[5%] h-16 w-16 overflow-hidden rounded-full fill-current"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            fillRule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <Modal isShow={isShow} onClose={onClose}>
        <RequestModal controller={setIsShow} />
      </Modal>
    </article>
  );
}
