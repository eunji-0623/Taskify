import { Link } from 'react-router-dom';
import Logo from '../../../../../public/icon/logo_large_dark.svg';
import styles from './Header.module.scss';

/*
랜더링 홈페이지의 header 컴포넌트입니다.
*/

function HomeHeader() {
  return (
    <header className={styles.Home_Header}>
      <Link to="/" className={styles.Logo__conatiner}>
        <img src={Logo} alt="로고이미지" width={120} height={40} />
      </Link>
      <div className={styles.sign__container}>
        <Link to="/login">
          <button className={styles.Header_login} type="button">로그인</button>
        </Link>
        <Link to="/signup">
          <button className={styles.Header_signup} type="button">회원가입</button>
        </Link>
      </div>
    </header>
  );
}

export default HomeHeader;
