import Button from '@/components/button';
import Modal from '@/components/modal';
import RequestModal from '@/components/request-modal';
import RootStore from '@/stores/store';
import { Request, type Status } from '@/types';
import Utils from '@/utils';
import { useState } from 'react';
import { useShallow } from 'zustand/react/shallow';

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

const PendingRequest = ({
  username,
  approver,
  reason,
  endDate,
  endMeridiem,
  startDate,
  startMeridiem,
}: Request) => {
  return (
    <li className="space-y-3 rounded-xl border border-dark-background-secondary p-4 dark:border-light-background-secondary">
      <p className="text-dark-text-accent dark:text-light-text-accent">
        {Utils.getRequestTitle({
          endDate,
          endMeridiem,
          startDate,
          startMeridiem,
        })}
      </p>
      <p>{reason}</p>
      <div className="flex justify-between">
        <div className="flex flex-col">
          <span>{`기안자: ${username}`}</span>
          <span>{`결재자: ${approver}`}</span>
        </div>
        <Button className="self-end border border-dark-background-secondary px-3 py-1 dark:border-light-background-secondary">
          취소
        </Button>
      </div>
    </li>
  );
};

const CompleteRequest = ({
  username,
  approver,
  reason,
  endDate,
  endMeridiem,
  startDate,
  startMeridiem,
  status,
}: Request) => {
  return (
    <li className="space-y-3 rounded-xl border border-dark-background-secondary p-4 dark:border-light-background-secondary">
      <p className="text-dark-text-accent dark:text-light-text-accent">
        {Utils.getRequestTitle({
          endDate,
          endMeridiem,
          startDate,
          startMeridiem,
        })}
      </p>
      <p>{reason}</p>
      <div className="flex justify-between">
        <div className="flex flex-col">
          <span>{`기안자: ${username}`}</span>
          <span>{`결재자: ${approver}`}</span>
        </div>
        <div
          className={Utils.combineClassNames(
            'self-end rounded-lg border border-dark-background-secondary bg-dark-background-main px-3 py-1 font-semibold text-dark-text-main dark:border-light-background-secondary dark:bg-light-background-main dark:text-light-text-main',
          )}
        >
          {status === 'approve' ? '✅ 승인' : '❌ 반려'}
        </div>
      </div>
    </li>
  );
};

export default function Home() {
  const PENDING_INDEX = 0;
  const [isShow, setIsShow] = useState<boolean>(false);
  const [currentTapIndex, setCurrentTapIndex] = useState(PENDING_INDEX);
  const pendingRequests = RootStore(
    useShallow((state) =>
      state.requests
        .filter((request) => request.status === 'pending')
        .sort((prev, cur) => cur.startDate - prev.startDate),
    ),
  );
  const completeRequests = RootStore(
    useShallow((state) =>
      state.requests
        .filter((request) => request.status !== 'pending')
        .sort((prev, cur) => cur.startDate - prev.startDate),
    ),
  );

  const onShowModal = () => {
    setIsShow(true);
  };

  const onCloseModal = () => {
    setIsShow(false);
  };

  return (
    <article className="relative w-4/5 justify-self-center overflow-scroll py-10">
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
        {currentTapIndex === PENDING_INDEX
          ? pendingRequests.map((request) => (
              <PendingRequest key={request.docId} {...request} />
            ))
          : completeRequests.map((request) => (
              <CompleteRequest key={request.docId} {...request} />
            ))}
      </ul>
      <RequestButton onClick={onShowModal} />
      <Modal isShow={isShow} onClose={onCloseModal}>
        <RequestModal setModalVisivility={setIsShow} />
      </Modal>
    </article>
  );
}
