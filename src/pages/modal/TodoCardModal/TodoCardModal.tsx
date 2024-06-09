import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import ModalContainer from '../ModalContainer/ModalContainer';
import Tag from '../../../components/chip/Tag/Tag';
import Comment from '../components/Comment/Comment';
import ProgressState from '../../../components/chip/ProgressState/ProgressState';
import styles from './TodoCardModal.module.scss';
import CloseIcon from '/icon/close.svg';
import KebabIcon from '/icon/kebab.svg';

/*
  만들어진 할 일 카드 정보를 모달로 보여줍니다.

  수정하기 모달과 연결을 위해 직접 사용하는 것이 아닌 TodoCardManagement를 통해 사용합니다.
*/

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  openEditModal: () => void;
  cardData: {
    cardState: string;
    manager: string;
    managerImg: string;
    title: string;
    description: string;
    dueDate: string;
    tags: string[];
    imageUrl?: string;
  };
}

function TodoCardModal({
  isOpen,
  setIsOpen,
  openEditModal,
  cardData,
}: ModalProps) {
  const [kebabOpen, setKebabOpen] = useState(false);
  const kebabRef = useRef<HTMLDivElement>(null);
  const {
    cardState,
    manager,
    managerImg,
    title,
    description,
    dueDate,
    tags,
    imageUrl,
  } = cardData;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (kebabOpen && kebabRef.current && !kebabRef.current.contains(event.target as Node)) {
        setKebabOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [kebabOpen]);

  // 모달 닫기
  const close = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const handleOpen = () => {
    setKebabOpen(!kebabOpen);
  };

  // 댓글을 처리하는 동작 추가
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  // 수정하기 버튼을 클릭하면 할 일 수정 모달이 열립니다.
  const handleEditOpen = () => {
    openEditModal();
  };

  return (
    <ModalContainer isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className={styles.container}>
        <h1>{title}</h1>
        <div className={styles.block}>
          <div className={styles.buttonBlock}>
            <button className={styles.kebabButton} type="button" onClick={handleOpen}>
              <img src={KebabIcon} alt="케밥 아이콘" />
            </button>
            {kebabOpen
              ? (
                <div className={styles.kebabButtons} ref={kebabRef}>
                  <button className={styles.kebabItem} type="button" onClick={handleEditOpen}>수정하기</button>
                  <button className={styles.kebabItem} type="button">삭제하기</button>
                </div>
              ) : null}
            <button className={styles.cancelButton} type="button" onClick={close}>
              <img src={CloseIcon} alt="닫기 아이콘" />
            </button>
          </div>

          <div className={styles.rightContent}>
            <div className={styles.managerBlock}>
              <h3>담당자</h3>
              <div className={styles.profileBlock}>
                <img className={styles.profile} src={managerImg} alt="테스트 이미지" />
                <span>{manager}</span>
              </div>
            </div>
            <div className={styles.dateBlock}>
              <h3>마감일</h3>
              <span>{dueDate}</span>
            </div>
          </div>

          <div className={styles.topBlock}>
            <span className={styles.condition}><ProgressState content={cardState} /></span>
            <div className={styles.tagBlock}>
              {tags.map((item) => (
                <span key={item}>
                  <Tag tagName={item} />
                </span>
              ))}
            </div>
          </div>

          <div className={styles.contentBlock}>
            <p>
              {description}
            </p>
            <div className={styles.contentImageBlock}>
              <img className={styles.contentImage} src={imageUrl} alt="카드 이미지" />
            </div>
          </div>

          <div className={styles.commentBlock}>
            <h2>댓글</h2>
            <form onSubmit={handleSubmit} className={styles.formBlock}>
              <textarea
                className={styles.textareaBlock}
                id="content"
                name="content"
                placeholder="댓글 작성하기"
                // value={comment}
                // onChange={handleCommentChange}
              />
              <button className={styles.formButton} type="submit">입력</button>
            </form>

            <div className={styles.comments}>
              <Comment />
              <Comment />
              <Comment />
              <Comment />
            </div>
          </div>
        </div>
      </div>
    </ModalContainer>
  );
}

export default TodoCardModal;
