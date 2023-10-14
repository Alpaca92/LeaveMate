import { container, listContainer } from '@/routes/profile.css';

export default function Profile() {
  return (
    <article className={container}>
      <p>Profile</p>
      <ul className={listContainer}>
        <li>
          <p>이름</p>
          <p>성이름</p>
        </li>
        <li>
          <p>이메일</p>
          <p>example@t-win.kr</p>
        </li>
        <li>
          <p>소속</p>
          <p>개발 1팀</p>
        </li>
        <li>
          <p>결재자</p>
          <p>팀장님</p>
        </li>
      </ul>
      <div></div>
    </article>
  );
}
