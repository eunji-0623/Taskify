import styles from './CardContent.module.scss';

/*
  카드 내용과 이미지 부분입니다.
*/

interface ModalProps {
  description: string;
  imageUrl: string | undefined;
}

function CardContent({ description, imageUrl }: ModalProps) {
  return (
    <div className={styles.contentBlock}>
      <p>
        {description}
      </p>
      <div className={styles.contentImageBlock}>
        {imageUrl && <img className={styles.contentImage} src={imageUrl} alt="카드 이미지" />}
      </div>
    </div>
  );
}

export default CardContent;
