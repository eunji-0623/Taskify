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
      <div className={styles.Image__Container}>
        <img
          src={ImgSrc}
          alt={`${ImgSrc} 이미지`}
          className={styles.Info_Img}
        />
      </div>
      <div className={styles.Text__Container}>
        <span className={styles.Text_title}>{Title}</span>
        <span className={styles.Text}>{Text}</span>
      </div>
    </div>
  );
}

export default Card;
