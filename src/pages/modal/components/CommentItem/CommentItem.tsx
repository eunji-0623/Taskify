// import { useState } from 'react';
import styles from './CommentItem.module.scss';
import TestImg from '/img/test_img.png';
// import { apiUpdateComment, apiDeleteComment } from '../../../../api/apiModule';

interface CommentProps {
  name: string;
  // commentText: string;
  // image: string | null;
}

function CommentItem({ name }: CommentProps) {
  // const [comment, setComment] = useState(commentText);
  // const [edit, setEdit] = useState(false);

  // 댓글 수정
  // const editComment = async (event) => {
  //   event.preventDefault();
  //   setEdit(false);

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

  // 댓글 삭제
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

  // const test = (event) => {
  //   event.preventDefault();
  //   setEdit(false);
  // };

  // const testEdit = () => {
  //   setEdit(true);
  // };

  // 댓글 수정 입력
  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setComment(event.target.value);
  // };

  return (
    <div className={styles.container}>
      <img className={styles.image} src={TestImg} alt="테스트 이미지" />
      <div className={styles.titleBlock}>
        <span className={styles.name}>{name}</span>
        <span className={styles.date}>2022.12.27 14:00</span>
      </div>

      <div className={styles.commentBlock}>
        {/* {edit ? (
            <form onSubmit={editComment}>
              <label htmlFor="text">댓글</label>
              <input
                type="text"
                id="text"
                name="text"
                value={comment}
                onChange={handleChange}
              />
              <button type="submit">수정</button>
            </form>
          ) : <p className={styles.comment}>{comment}</p>} */}
      </div>

      {/* <div className={styles.buttonBlock}>
        <button className={styles.button} type="button" onClick={testEdit}>수정</button>
        <button className={styles.button} type="button">삭제</button>
      </div> */}
    </div>
  );
}

export default CommentItem;
