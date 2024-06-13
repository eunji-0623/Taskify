import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
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
  const [cursorId, setCursorId] = useState<number | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  // 댓글 목록 조회
  const apiCommentList = useCallback(async (Id: number, pId: number | null) => {
    setLoading(true);
    try {
      const response = await apiGetCommentList(Id, pId ?? 0);
      setComments((prev) => [...prev, ...response.comments]);

      if (response.comments.length > 0) {
        setCursorId(response.comments[response.comments.length - 1].id);
      } else {
        setCursorId(null);
      }
    } catch (error) {
      throw new Error('error');
    } finally {
      setLoading(false);
      window.scrollTo(0, scrollPosition);
    }
  }, [scrollPosition]);

  useEffect(() => {
    apiCommentList(cardId, cursorId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiCommentList, cardId]);

  const lastComment = useCallback(
    (node: Element | null) => {
      if (loading) return;

      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && cursorId !== null) {
          setScrollPosition(window.scrollY);
          apiCommentList(cardId, cursorId);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, cursorId, cardId, apiCommentList],
  );

  const handleScroll = () => {
    setScrollPosition(window.scrollY);
  };

  // 맨 위로 올리기 버튼
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (loading && comments.length === 0) return <div className={styles.loadingText}>로딩 중...</div>;

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
      setComments([]);
      setCursorId(null);
      apiCommentList(cardId, null);
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
        {comment ? (
          <button className={styles.formButtonClick} type="submit">
            입력
          </button>
        ) : (
          <button className={styles.formButton} type="submit" disabled>
            입력
          </button>
        )}
      </form>

      <div className={styles.comments}>
        {comments.length === 0 ? (
          <p className={styles.loadingText}>댓글이 없습니다.</p>
        ) : (
          comments.map((item, index) => (
            <CommentItem
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              ref={index === comments.length - 1 ? lastComment : null}
              name={item.author.nickname}
              commentText={item.content}
              date={item.createdAt}
              userId={userId}
              edituserId={item.author.id}
              image={item.author.profileImageUrl}
              commentId={item.id}
              apiCommentList={apiCommentList}
              cardId={cardId}
            />
          ))
        )}
      </div>
      <button type="button" className={styles.scrollToTopButton} onClick={scrollToTop}>▲</button>

      {loading && <div className={styles.loadingText}>로딩 중...</div>}
    </div>
  );
}

export default Comment;
