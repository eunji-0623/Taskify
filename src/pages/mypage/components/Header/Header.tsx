import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';
import UserProfileImg from '../../../../components/UserProfileImg/UserProfileImg';
import { UserContext } from '../../../../contexts/UserContext';

/*
/mypage 에서 사용되는 헤더 컴포넌트입니다.
*/

function ProfileKebab() {
  const navigate = useNavigate();

  const myPageClick = () => {
    navigate('/mypage');
  };

  const logoutClick = () => {
    localStorage.clear(); // 모든 localStorage 항목을 제거
    navigate('/login'); // 페이지 새로고침
  };

  return (
    <div className={styles.ProfileKebab}>
      <button
        className={styles.ProfileKebabBtn}
        type="button"
        onClick={myPageClick}
      >
        마이 페이지
      </button>
      <button
        className={styles.ProfileKebabBtn}
        type="button"
        onClick={logoutClick}
      >
        로그아웃
      </button>
    </div>
  );
}

function MyPageHeader() {
  const [ProfileKebabOpen, setProfileKebabOpen] = useState<boolean>(false);
  const userContext = useContext(UserContext);

  const profileOver = () => {
    setProfileKebabOpen(true); // 상태를 토글
  };
  const ProfileLeave = () => {
    setProfileKebabOpen(false);
  };

  if (!userContext) {
    throw new Error('반드시 DashboardProvider 안에서 사용해야 합니다.');
  }

  const { userInfo } = userContext;
  const profileImageUrl = userInfo?.profileImageUrl || '#A3C4A2';
  const isImg = Boolean(userInfo?.profileImageUrl);

  return (
    <header className={styles.MyDashboardHeader}>
      <div className={styles.DashboardTitle}>계정 관리</div>
      <div
        className={styles.DashboardUserInfo}
        onMouseOver={profileOver}
        onMouseLeave={ProfileLeave}
        onFocus={profileOver}
      >
        <UserProfileImg
          isImg={isImg}
          profileImageUrl={profileImageUrl}
          nickname={userInfo?.nickname}
        />
        <div className={styles.userName}>{userInfo?.nickname}</div>
        {ProfileKebabOpen && <ProfileKebab />}
        {' '}
      </div>
    </header>
  );
}

export default MyPageHeader;
