import styles from './Card.module.scss';

/*
랜더링 페이지에 사용되는 Card 컴포넌트로
 이미지와 텍스트 내용을 Props로 받습니다.
*/

interface CardProps {
  ImgSrc: string;
  Title: string;
  Text: string;
}

function Card({ ImgSrc, Title, Text }: CardProps) {
  return (
    <div className={styles.Card}>
      <div className={styles.ImageContainer}>
        <img
          src={ImgSrc}
          alt={`${ImgSrc} 이미지`}
          className={styles.InfoImg}
        />
      </div>
      <div className={styles.TextContainer}>
        <span className={styles.TextTitle}>{Title}</span>
        <span className={styles.Text}>{Text}</span>
      </div>
    </div>
  );
}

export default Card;
