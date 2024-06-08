import styles from './Comment.module.scss';
import TestImg from '/img/test_img.png';

function Comment() {
  return (
    <div className={styles.container}>
      <img className={styles.image} src={TestImg} alt="테스트 이미지" />
      <div className={styles.titleBlock}>
        <span className={styles.name}>이름</span>
        <span className={styles.date}>2022.12.27 14:00</span>
      </div>

      <div className={styles.commentBlock}>
        <p className={styles.comment}>오늘안에 CCC 까지 만들 수 있을까요?</p>
      </div>

      <div className={styles.buttonBlock}>
        <button className={styles.button} type="button">수정</button>
        <button className={styles.button} type="button">삭제</button>
      </div>
    </div>
  );
}

export default Comment;
