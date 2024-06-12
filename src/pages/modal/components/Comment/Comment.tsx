import React, { useCallback, useEffect, useState } from 'react';
import styles from './Comment.module.scss';
// import CommentItem from '../CommentItem/CommentItem';
import { apiGetCommentList, apiCreateComments } from '../../../../api/apiModule';

/*
  댓글 컴포넌트입니다.
*/

interface ModalProps {
  cardId: number;
  columnId: number;
  dashboardId: number;
}

function Comment({ cardId, columnId, dashboardId }: ModalProps) {
  // const [commentData, setCommentData] = useState();
  const [comment, setComment] = useState('');

  // 댓글 목록 조회
  const apiGetCommentData = useCallback(async () => {
    try {
      const response = await apiGetCommentList(cardId);
      if (response) {
        // setCommentData(response);
        // console.log('테스트', response);
      } else {
        throw new Error('error');
      }
    } catch (error) {
      throw new Error('error');
    }
  }, [cardId]);

  useEffect(() => {
    if (cardId) {
      apiGetCommentData();
    }
  }, [cardId, apiGetCommentData]);

  // 새로운 댓글 생성
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const newComment = {
      content: comment,
      cardId,
      columnId,
      dashboardId,
    };

    try {
      await apiCreateComments(newComment);
      setComment('');
    } catch (error) {
      throw new Error('error');
    }
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
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
        {/* <CommentItem name="test" commentText="테스트입니다." image={null} />
        <CommentItem name="test" commentText="테스트입니다." image={null} /> */}
      </div>
    </div>
  );
}

export default Comment;
