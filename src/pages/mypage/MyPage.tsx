import styles from './MyPage.module.scss';
import ProfileEdit from './components/ProfileEdit/ProfileEdit';
import PasswordEdit from './components/PasswordEdit/PasswordEdit';
import ArrowIcon from '../../../public/icon/arrow_forward.svg';

// navBar, sideBar 부분은 컴포넌트로 추가할 예정입니다.

function MyPage() {
  return (
    <div className={styles.myPageLayout}>
      <div className={styles.navBar}></div>
      <div className={styles.sideBar}></div>
      <div className={styles.backContainer}>
        <img
          className={styles.backIcon}
          src={ArrowIcon}
          alt="왼쪽 바라보는 화살표 이미지"
        />
        <span className={styles.backText}>돌아가기</span>
      </div>
      <ProfileEdit />
      <PasswordEdit />
    </div>
  );
}

export default MyPage;
