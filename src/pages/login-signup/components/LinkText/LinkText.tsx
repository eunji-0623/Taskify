import { Link } from 'react-router-dom';
import styles from './LinkText.module.scss';

type LinkTextProps = {
  Text: string;
  LinkRouter: string;
  TextForLink: string;
};

function LinkText({ Text, LinkRouter, TextForLink }: LinkTextProps) {
  return (
    <div className={styles.LinkTextContainer}>
      <span className={styles.LinkText}>{Text}</span>
      <Link to={LinkRouter} className={styles.Link}>
        {TextForLink}
      </Link>
    </div>
  );
}

export default LinkText;
