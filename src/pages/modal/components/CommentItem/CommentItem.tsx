// import { useState } from 'react';
import { useState } from 'react';
import styles from './CommentItem.module.scss';
import TestImg from '/img/test_img.png';
// import { apiUpdateComment, apiDeleteComment } from '../../../../api/apiModule';

/*
  Comment.tsx에서 이름, 댓글, 프로필을 입력받아 댓글을 보여줍니다.
*/

interface CommentProps {
  name: string;
  commentText: string;
  // image: string | null;
}

function CommentItem({ name, commentText }: CommentProps) {
  const [comment, setComment] = useState(commentText);
  const [edit, setEdit] = useState(false);

  // 댓글 수정
  const apiEditComment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEdit(false);

    // const updateComment = {
    //   content: comment,
    // };

    // try {
    //   const response = await apiUpdateComment(updateComment);
    //   console.log('test', response);

    //   setComment('');
    // } catch (error) {
    //   console.error(error);
    // }
  };

  // 댓글 삭제
  // const apiDeleteComment = async () => {
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

  const handleEditClick = () => {
    setEdit(!edit);
  };

  // 댓글 수정 입력
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  return (
    <div className={styles.container}>
      <img className={styles.image} src={TestImg} alt="테스트 이미지" />
      <div className={styles.titleBlock}>
        <span className={styles.name}>{name}</span>
        <span className={styles.date}>2022.12.27 14:00</span>
      </div>

      <div className={styles.commentBlock}>
        {edit ? (
          <form onSubmit={apiEditComment}>
            <label className={styles.formLabel} htmlFor="text">댓글</label>
            <input
              className={styles.formInput}
              type="text"
              id="text"
              name="text"
              value={comment}
              onChange={handleChange}
            />
            <button className={styles.formButton} type="submit">수정</button>
          </form>
        ) : <p className={styles.comment}>{comment}</p>}
      </div>

      <div className={styles.buttonBlock}>
        {edit ? <button className={styles.button} type="button" onClick={handleEditClick}>취소</button> : <button className={styles.button} type="button" onClick={handleEditClick}>수정</button>}
        <button className={styles.button} type="button">삭제</button>
      </div>
    </div>
  );
}

export default CommentItem;
