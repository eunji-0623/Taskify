import { Link } from 'react-router-dom';
import styles from './Logo.module.scss';
import LogoImage from '../../../../../public/icon/logo_main.svg';

type HelloText = {
  Text: string;
};

function Logo({ Text }: HelloText) {
  return (
    <>
      <Link to="/">
        <img src={LogoImage} className={styles.LogoImage} alt="LogoImage" />
      </Link>
      <span className={styles.HelloText}>{Text}</span>
    </>
  );
}

export default Logo;
