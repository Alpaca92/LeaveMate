import { useState } from 'react';
import Modal from '@/components/modal';
import RequestModal from '@/components/request-modal';

interface RequestModalProps {
  onClick: () => void;
}

const RequestButton = ({ onClick }: RequestModalProps) => {
  return (
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
  );
};

export default function Home() {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [currentTapIndex, setCurrentTapIndex] = useState(0);

  const onShowModal = () => {
    setIsShow(true);
  };

  const onCloseModal = () => {
    setIsShow(false);
  };

  return (
    <article className="relative overflow-scroll px-12 py-10">
      <ul className="flex cursor-pointer space-x-3">
        {['결재대기', '결재완료'].map((text, i) => (
          <li
            key={i}
            onClick={() => setCurrentTapIndex(i)}
            className={`${
              currentTapIndex === i
                ? 'font-extrabold'
                : 'text-light-text-secondary dark:text-dark-text-secondary'
            }`}
          >
            {text}
          </li>
        ))}
      </ul>
      <ul className="mt-4 space-y-4">
        {new Array(50).fill(0).map((_, i) => (
          // FIXME: currentTapIndex에 따라 보여줄 list 달리하기
          <li
            key={i}
            className="rounded-xl border border-dark-background-secondary p-4 dark:border-light-background-secondary"
          >
            <p className="text-dark-text-accent dark:text-light-text-accent">
              기간: 23/03/01(목) 오전 ~ 23/03/02(금) 오전 (1.5일간)
            </p>
            <div className="flex justify-between">
              <div className="mt-3 flex flex-col">
                <span>기안자: 이름</span>
                <span>결재자: 팀장</span>
              </div>
              <button className="self-end rounded-xl border border-dark-background-secondary bg-dark-background-main px-3 py-1 text-dark-text-main dark:border-light-background-secondary dark:bg-light-background-main dark:text-light-text-main">
                취소
              </button>
            </div>
          </li>
        ))}
      </ul>
      <RequestButton onClick={onShowModal} />
      <Modal isShow={isShow} onClose={onCloseModal}>
        <RequestModal controller={setIsShow} />
      </Modal>
    </article>
  );
}
