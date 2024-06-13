import React, { useCallback, useEffect, useState } from 'react';
import styles from './Comment.module.scss';
import CommentItem from '../CommentItem/CommentItem';
import { apiGetCommentList, apiCreateComments } from '../../../../api/apiModule';

/*
  댓글 컴포넌트입니다.
*/

interface ModalProps {
  cardId: number;
  columnId: number;
  userId: number;
  dashboardId: number;
}

interface CommentOverAll {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  cardId: number;
  author: {
    profileImageUrl: string;
    nickname: string;
    id: number;
  };
}

function Comment({
  cardId,
  columnId,
  userId,
  dashboardId,
}: ModalProps) {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<CommentOverAll[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // 댓글 목록 조회
  const apiCommentList = useCallback(async () => {
    setLoading(true);
    try {
      const response = await apiGetCommentList(cardId);
      setComments(response.comments);
    // eslint-disable-next-line @typescript-eslint/no-shadow
    } catch (error) {
      throw new Error('error');
    } finally {
      setLoading(false);
    }
  }, [cardId]);

  useEffect(() => {
    apiCommentList();
  }, [cardId, apiCommentList]);

  if (loading) return <div className={styles.loadingText}>로딩 중...</div>;

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

      apiCommentList();
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
        {comment ? <button className={styles.formButtonClick} type="submit">입력</button> : <button className={styles.formButton} type="submit" disabled>입력</button>}
      </form>

      <div className={styles.comments}>
        {comments.length === 0 ? (
          <p className={styles.loadingText}>댓글이 없습니다.</p>
        ) : (
          comments.map((commentItem) => (
            <CommentItem
              key={commentItem.id}
              name={commentItem.author.nickname}
              commentText={commentItem.content}
              date={commentItem.createdAt}
              userId={userId}
              edituserId={commentItem.author.id}
              image={commentItem.author.profileImageUrl}
              commentId={commentItem.id}
              apiCommentList={apiCommentList}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Comment;
