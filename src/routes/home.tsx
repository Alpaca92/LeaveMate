import Button from '@/components/button';
import Modal from '@/components/modal';
import RequestModal from '@/components/request-modal';
import RootStore from '@/stores/store';
import { Request } from '@/types';
import Utils from '@/utils';
import { useMemo, useState } from 'react';
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

const CompleteRequest = ({ username, approver, reason }: Request) => {
  return (
    <li className="space-y-3 rounded-xl border border-dark-background-secondary p-4 dark:border-light-background-secondary">
      <p className="text-dark-text-accent dark:text-light-text-accent">
        {/* FIXME: 날짜를 정상적으로 적용될 수 있도록 해야 함 => Request data를 가공해서 끝나는날에 +0.5를 해주기 */}
        23/03/01(목) 오전 ~ 23/03/02(금) 오전 (1.5일간)
      </p>
      <p>{reason}</p>
      <div className="flex justify-between">
        <div className="flex flex-col">
          <span>{`기안자: ${username}`}</span>
          <span>{`결재자: ${approver}`}</span>
        </div>
        {/* FIXME: 결재가 됐는지 반려가 됐는지 알 수 있는 버튼과 비슷한 사이즈의 박스 추가 */}
      </div>
    </li>
  );
};

export default function Home() {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [currentTapIndex, setCurrentTapIndex] = useState(0);
  const requests = RootStore(useShallow((state) => state.requests));
  const pendingRequests = useMemo(
    () => requests.filter(({ status }) => status === 'pending'),
    [requests],
  );
  const completeRequests = useMemo(
    () => requests.filter(({ status }) => status !== 'pending'),
    [requests],
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
        {currentTapIndex === 0
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
