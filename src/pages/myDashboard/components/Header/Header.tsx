import styles from './Header.module.scss';
import { DashboardContext } from '../../../../contexts/DashboardContext';
import { useContext } from 'react';
import UserProfileImg from '../../../../components/UserProfileImg/UserProfileImg';

function MyDashboardHeader() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('반드시 DashboardProvider 안에서 사용해야 합니다.');
  }

  return(
    <header className={styles.MyDashboardHeader}>
      <div className={styles.DashboardTitle}>
        내 대시보드
      </div>
      <div className={styles.DashboardUserInfo}>
        <UserProfileImg isImg = {false} profileImageUrl='#A3C4A2' nickname='Test'/>
        <div className={styles.userName}>
          Test
        </div>
      </div>
    </header>
  )
}

export default MyDashboardHeader;