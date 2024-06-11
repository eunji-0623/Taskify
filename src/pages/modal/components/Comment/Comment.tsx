import React, { useState } from 'react';
import styles from './Comment.module.scss';
// import CommentItem from '../CommentItem/CommentItem';
import { apiCreateComments } from '../../../../api/apiModule';
/*
  댓글 컴포넌트입니다.
*/

function Comment() {
  const [comment, setComment] = useState('');

  const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const newComment = {
      content: comment,
      cardId: 7687,
      columnId: 29765,
      dashboardId: 8855,
    };

    try {
      await apiCreateComments(newComment);
      setComment('');
    } catch (error) {
      throw new Error('error');
    }
  };

  return (
    <div className={styles.commentBlock}>
      <h2>댓글</h2>
      <form onSubmit={handleSubmit} className={styles.formBlock}>
        <textarea
          className={styles.textareaBlock}
          id="content"
          name="content"
          placeholder="댓글 작성하기"
          value={comment}
          onChange={handleCommentChange}
        />
        <button className={styles.formButton} type="submit">입력</button>
      </form>

      <div className={styles.comments}>
        {/* <CommentItem name="test" commentText="테스트입니다." image={null} /> */}
        {/* <CommentItem />
        <CommentItem />
        <CommentItem /> */}
      </div>
    </div>
  );
}

export default Comment;
