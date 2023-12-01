import Utils from '@/utils';
import { EventWrapperProps } from 'react-big-calendar';

export default function EventWrapper({ event }: EventWrapperProps) {
  const DEFAULT_COLOR = 'bg-gray-500';
  const COLORS = ['bg-red-500', 'bg-yellow-500', 'bg-blue-500'];

  const {
    title,
    resource: { username },
  } = event;
  const userIndex = -1; // FIXME: myTeamMembers를 어떻게 불러오거나 다른 방법으로 색을 입혀야 할 듯
  // const userIndex = myTeamMembers.indexOf(username);

  return (
    <div
      className={Utils.combineClassNames(
        userIndex === -1 ? DEFAULT_COLOR : COLORS[userIndex % COLORS.length],
        'p-[0.2rem]',
      )}
    >
      {title}
    </div>
  );
}
