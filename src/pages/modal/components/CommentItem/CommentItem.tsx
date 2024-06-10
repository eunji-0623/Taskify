import styles from './CommentItem.module.scss';
import TestImg from '/img/test_img.png';
import { apiUpdateComment, apiDeleteComment } from '../../../../api/apiModule';

function CommentItem() {
  // const editComment = async () => {
  //   const updateComment = {
  //     content: comment,
  //   };

  //   try {
  //     const response = await apiUpdateComment(updateComment);
  //     console.log('test', response);

  //     setComment('');
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const deleteComment = async () => {
  //   const newComment = {
  //     content: comment,
  //     cardId: 7687,
  //     columnId: 29765,
  //     dashboardId: 8855,
  //   };

  //   try {
  //     const response = await apiDeleteComment(newComment);
  //     console.log('test', response);

  //     setComment('');
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

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

export default CommentItem;
