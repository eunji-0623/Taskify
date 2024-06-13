import styles from './Header.module.scss';
import UserProfileImg from '../../../../components/UserProfileImg/UserProfileImg';

function MyPageHeader() {
  return (
    <header className={styles.MyDashboardHeader}>
      <div className={styles.MyPageTitle}>계정 관리</div>
      <div className={styles.DashboardUserInfo}>
        <UserProfileImg
          isImg={false}
          profileImageUrl="#A3C4A2"
          nickname="Test"
        />
        <div className={styles.userName}>Test</div>
      </div>
    </header>
  );
}

export default MyPageHeader;
