import styles from './LinkText.module.scss';

type LinkTextProps = {
  Text: string;
  Link: string;
  LinkText: string;
};

function LinkText({ Text, Link, LinkText }: LinkTextProps) {
  return (
    <>
      <div className={styles.LinkTextContainer}>
        <span className={styles.LinkText}>{Text}</span>
        <a href={Link} className={styles.Link}>
          {LinkText}
        </a>
      </div>
    </>
  );
}

export default LinkText;
