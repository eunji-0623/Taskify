import styles from './MyPage.module.scss';
import ProfileEdit from './components/ProfileEdit/ProfileEdit';
import PasswordEdit from './components/PasswordEdit/PasswordEdit';
import ArrowIcon from '../../../public/icon/arrow_forward.svg';

// navBar, sideBar 부분은 컴포넌트로 추가할 예정입니다.

function MyPage() {
  return (
    <div className={styles.myPageLayout}>
      <div className={styles.navBar} />
      <div className={styles.sideBar} />
      <div className={styles.backContainer}>
        <img className={styles.backIcon} src={ArrowIcon} />
        <span className={styles.backText}>돌아가기</span>
      </div>
      <ProfileEdit
        id="myPage-name"
        name="myPage-name"
        type="text"
        placeholder="닉네임을 입력해 주세요."
      />
      <PasswordEdit
        id="myPage-password-check"
        name="myPage-password-check"
        type="text"
      />
    </div>
  );
}

export default MyPage;
