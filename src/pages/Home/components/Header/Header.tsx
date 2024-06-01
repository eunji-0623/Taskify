import { Link } from 'react-router-dom';
import Logo from '/public/icon/logo_large_dark.svg';
import styles from './Header.module.scss';

/*
랜더링 홈페이지의 header 컴포넌트입니다.
*/

function HomeHeader() {
  return (
    <header className={styles.HomeHeader}>
      <Link to="/" className={styles.LogoConatiner}>
        <img src={Logo} alt="로고이미지" width={120} height={40} />
      </Link>
      <div className={styles.signContainer}>
        <Link to="/login">
          <button className={styles.HeaderLogin} type="button">로그인</button>
        </Link>
        <Link to="/signup">
          <button className={styles.HeaderSignup} type="button">회원가입</button>
        </Link>
      </div>
    </header>
  );
}

export default HomeHeader;
