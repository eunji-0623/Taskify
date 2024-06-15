import { Link } from 'react-router-dom';
import styles from './NotFound.module.scss';
import Logo from '/icon/logo_small.svg';

function NotFound() {
  return (
    <div className={styles.NotFound}>
      <img src={Logo} alt="Taskify 로고" className={styles.LogoMain} />
      <h1 className={styles.Error}>404 ERROR</h1>
      <div className={styles.text1}>페이지를 찾을 수 없습니다!</div>
      <div className={styles.text2}>
        존재하지 않거나, 사용할 수 없는 페이지 입니다.
      </div>
      <Link to="/" className={styles.goToMainBtn}>
        <div>메인으로</div>
      </Link>
    </div>
  );
}

export default NotFound;
