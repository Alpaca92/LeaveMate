import Button from '@/components/button';
import Modal from '@/components/modal';
import { QUERY_KEYS } from '@/config/config';
import RequestModal from '@/components/request-modal';
import Utils from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

interface RequestModalProps {
  onClick: () => void;
}

const RequestButton = ({ onClick }: RequestModalProps) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-[13%] right-[5%] flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-dark-background-main dark:bg-light-background-main"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="h-8 w-8 stroke-light-background-main stroke-2 dark:stroke-dark-background-main"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </svg>
    </button>
  );
};

export default function Home() {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [currentTapIndex, setCurrentTapIndex] = useState(0);
  const { data } = useQuery({
    queryKey: [QUERY_KEYS.FIRESTORE, QUERY_KEYS.REQUESTS],
    queryFn: Utils.fetchRequests,
  });

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
              <Button className="self-end border border-dark-background-secondary px-3 py-1 dark:border-light-background-secondary">
                취소
              </Button>
            </div>
          </li>
        ))}
      </ul>
      <RequestButton onClick={onShowModal} />
      <Modal isShow={isShow} onClose={onCloseModal}>
        <RequestModal setModalVisivility={setIsShow} />
      </Modal>
    </article>
  );
}
