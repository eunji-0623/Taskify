import styles from './Header.module.scss';
import { DashboardContext } from '../../../../contexts/DashboardContext';
import { useContext } from 'react';

function MyDashboardHeader() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('반드시 DashboardProvider 안에서 사용해야 합니다.');
  }
  const { activeDashboard } = context;

  return(
    <header className={styles.MyDashboardHeader}>
      <div className={styles.DashboardTitle}>
        대시보드 {activeDashboard}
      </div>
      <div className={styles.DashboardUserInfo}>
        <div className={styles.userImage}>
          프로필 이미지
        </div>
        <div className={styles.userName}>
          유저 이름
        </div>
      </div>
    </header>
  )
}

export default MyDashboardHeader;