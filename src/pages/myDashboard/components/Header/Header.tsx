import { useContext } from 'react';
import styles from './Header.module.scss';
import UserProfileImg from '../../../../components/UserProfileImg/UserProfileImg';
import { UserContext } from '../../../../contexts/UserContext';

/*
/mydashboard 에서 사용되는 헤더 컴포넌트입니다.
*/

function MyDashboardHeader() {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error('반드시 DashboardProvider 안에서 사용해야 합니다.');
  }

  const { userInfo } = userContext;

  return (
    <header className={styles.MyDashboardHeader}>
      <div className={styles.DashboardTitle}>내 대시보드</div>
      <div className={styles.DashboardUserInfo}>
        <UserProfileImg
          isImg={false}
          profileImageUrl="#A3C4A2"
          nickname={userInfo?.nickname}
        />
        <div className={styles.userName}>{userInfo?.nickname}</div>
      </div>
    </header>
  );
}

export default MyDashboardHeader;
