import styles from './MyPage.module.scss';
import ProfileEdit from './components/ProfileEdit/ProfileEdit';
import PasswordEdit from './components/PasswordEdit/PasswordEdit';
import ArrowIcon from '../../../public/icon/arrow_forward.svg';
import SideBar from '../../components/sidebar/sidebar';
import MyPageHeader from './components/Header/Header';

function MyPage() {
  return (
    <div className={styles.myPageLayout}>
      <SideBar />
      <div className={styles.MyPageContainer}>
        <MyPageHeader />
        <div className={styles.pageBackContainer}>
          <img
            className={styles.pageBackIcon}
            src={ArrowIcon}
            alt="왼쪽 바라보는 화살표 이미지"
          />
          <span className={styles.pageBackText}>돌아가기</span>
        </div>
        <ProfileEdit />
        <PasswordEdit />
      </div>
    </div>
  );
}

export default MyPage;
