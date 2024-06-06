import { useCallback } from 'react';
import ModalContainer from '../ModalContainer/ModalContainer';
import styles from './EditColumnModal.module.scss';

/*
  컬럼을 수정하는 모달입니다.
*/

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

// 컬럼 데이터가 필요
function EditColumnModal({ isOpen, setIsOpen }: ModalProps) {
  // 모달 닫기
  const close = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  // 컬럼 변경 버튼 클릭 시 동작
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // submit 테스트
    console.log('submit');
  }

  return (
    <ModalContainer isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className={styles.container}>
        <h1>컬럼 관리</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.content}>
            <label htmlFor="name">이름</label>
            <input className={styles.inputText} type="text" id="name" name="name" required />
          </div>

          <div className={styles.buttonBlock}>
            <span className={styles.delete}>삭제하기</span>

            <div className={styles.buttons}>
              <button className={styles.cancelButton} type="button" onClick={close}>취소</button>
              <button className={styles.createButton} type="submit">변경</button>
            </div>
          </div>
        </form>
      </div>
    </ModalContainer>
  );
}

export default EditColumnModal;