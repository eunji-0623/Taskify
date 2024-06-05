import { useState } from 'react';
import ModalContainer from '../ModalContainer/ModalContainer';
import styles from './TodoCardModal.module.scss';

/*
  만들어진 할 일 카드 정보를 모달로 보여줍니다.
*/

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

// 카드 데이터가 필요
function TodoCardModal({ isOpen, setIsOpen }: ModalProps) {
  const [kebabOpen, setKebabOpen] = useState(false);

  function handleOpen() {
    setKebabOpen(!kebabOpen);
  }

  return (
    <ModalContainer isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className={styles.container}>
        <h1>새로운 일정 관리</h1>
        <div className={styles.buttonBlock}>
          <button className={styles.kebabButton} type="button" onClick={handleOpen}>...</button>
          {kebabOpen
            ? (
              <div className={styles.kebabButtons}>
                <button className={styles.kebabItem} type="button">수정하기</button>
                <button className={styles.kebabItem} type="button">삭제하기</button>
              </div>
            ) : null}
          <button className={styles.cancelButton} type="button">X</button>
        </div>

        <div className={styles.topBlock}>
          <span className={styles.condition}>상태</span>
          <div className={styles.tagBlock}>
            <span className={styles.tagText}>태그</span>
            <span className={styles.tagText}>태그</span>
          </div>
        </div>

        <div className={styles.contentBlock}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Vestibulum finibus nibh arcu, quis consequat ante cursus eget.
            Cras mattis, nulla non laoreet porttitor, diam justo laoreet eros,
            vel aliquet diam elit at leo.
          </p>
          <div className={styles.contentImage}>이미지</div>
        </div>

        <div className={styles.commentBlock}>
          <h2>댓글</h2>
          <div className={styles.writeBlock}>
            댓글 작성하기 박스
          </div>

          <div className={styles.comments}>
            작성된 댓글
          </div>
        </div>

        <div className={styles.rightContent}>
          <div className={styles.managerBlock}>
            <h3>담당자</h3>
            <div className={styles.profileBlock}>프로필</div>
          </div>
          <div className={styles.dateBlock}>
            <h3>마감일</h3>
            <p>마감일</p>
          </div>
        </div>
      </div>
    </ModalContainer>
  );
}

export default TodoCardModal;
