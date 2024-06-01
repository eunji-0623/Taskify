import { Link } from 'react-router-dom';
import Logo from '/public/icon/logo_large_dark.svg';
import LogoMobile from '/public/icon/logo_small_dark.svg';
import styles from './Header.module.scss';

/*
랜더링 홈페이지의 header 컴포넌트입니다.
*/

function HomeHeader() {
  return (
    <header className={styles.HomeHeader}>
      <Link to="/" className={styles.LogoConatiner}>
        <img src={Logo} alt="로고 이미지" width={120} height={40} className={styles.Logo} />
        <img src={LogoMobile} alt="로고 이미지" width={24} height={28} className={styles.LogoMobile} />
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
