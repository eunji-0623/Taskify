import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';
import MailImg from '/icon/email_icon.svg';
import FacebookImg from '/icon/facebook_logo.svg';
import InstagramImg from '/icon/instagram_logo.svg';

/*
랜딩 페이지의 Footer 입니다.
*/

function Footer() {
  return (
    <footer className={styles.Footer}>
      <span className={styles.FooterText}>©codeit - 2024</span>
      <div className={styles.Links}>
        <Link to="/privacy" className={styles.FooterText}>
          Privacy Policy
        </Link>
        <Link to="/faq" className={styles.FooterText}>
          FAQ
        </Link>
      </div>
      <div className={styles.FooterImgs}>
        <img src={MailImg} alt="메일 이미지" />
        <img src={FacebookImg} alt="페이스북 로고 이미지" />
        <img src={InstagramImg} alt="인스타그램 로고 이미지" />
      </div>
    </footer>
  );
}

export default Footer;
