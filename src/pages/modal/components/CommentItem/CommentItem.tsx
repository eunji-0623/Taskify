import { forwardRef, useState } from 'react';
import { format } from 'date-fns';
import styles from './CommentItem.module.scss';
import { apiUpdateComment, apiDeleteComment } from '../../../../api/apiModule';

interface CommentProps {
  name: string;
  commentText: string;
  image: string | null;
  commentId: number;
  apiCommentList: (Id: number, pId: number | null) => Promise<void>;
  userId: number;
  edituserId: number;
  date: string;
  cardId: number;
}

const CommentItem = forwardRef<HTMLDivElement, CommentProps>(({
  name,
  commentText,
  date,
  image,
  commentId,
  apiCommentList,
  userId,
  edituserId,
  cardId,
}, ref) => {
  const [comment, setComment] = useState(commentText);
  const [editComment, setEditComment] = useState(commentText);
  const [edit, setEdit] = useState(false);

  // 댓글 수정
  const apiEditComment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEdit(false);

    const updateComment = {
      content: editComment,
    };

    try {
      await apiUpdateComment(updateComment, commentId);
      setComment(editComment);
    } catch (error) {
      throw new Error('error');
    }
  };

  // 댓글 삭제
  const apiDelete = async () => {
    try {
      await apiDeleteComment(commentId);
      apiCommentList(cardId, 0);
    } catch (error) {
      throw new Error('error');
    }
  };

  // 수정
  const handleEditClick = () => {
    setEdit(!edit);
    setComment(editComment);
  };

  // 취소
  const handleEditCancelClick = () => {
    setEdit(!edit);
    setEditComment(comment);
  };

  // 댓글 수정 입력
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditComment(event.target.value);
  };

  return (
    <div className={styles.container} ref={ref}>
      <img className={styles.image} src={image || ''} alt="테스트 이미지" />
      <div className={styles.titleBlock}>
        <span className={styles.name}>{name}</span>
        <span className={styles.date}>{format(date, 'yyyy-MM-dd HH:mm')}</span>
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
              value={editComment}
              onChange={handleChange}
            />
            <button className={styles.formButton} type="submit">수정</button>
          </form>
        ) : (
          <p className={styles.comment}>{comment}</p>
        )}
      </div>

      {userId === edituserId && (
        <div className={styles.buttonBlock}>
          {edit ? (
            <button className={styles.button} type="button" onClick={handleEditCancelClick}>취소</button>
          ) : (
            <button className={styles.button} type="button" onClick={handleEditClick}>수정</button>
          )}
          <button className={styles.button} type="button" onClick={apiDelete}>삭제</button>
        </div>
      )}
    </div>
  );
});

export default CommentItem;
