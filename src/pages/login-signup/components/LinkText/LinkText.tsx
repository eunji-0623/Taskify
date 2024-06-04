import styles from './LinkText.module.scss';

type LinkTextProps = {
  Text: string;
  Link: string;
  TextForLink: string;
};

function LinkText({ Text, Link, TextForLink }: LinkTextProps) {
  return (
    <div className={styles.LinkTextContainer}>
      <span className={styles.LinkText}>{Text}</span>
      <a href={Link} className={styles.Link}>
        {TextForLink}
      </a>
    </div>
  );
}

export default LinkText;
