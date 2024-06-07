import { useCallback } from 'react';
import ModalContainer from '../ModalContainer/ModalContainer';
import styles from './NewDashModal.module.scss';

/*
  대시보드 생성하는 모달입니다.
  사용자가 대시보드 이름과 색을 선택할 수 있습니다.
*/

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

function NewDashModal({ isOpen, setIsOpen }: ModalProps) {
  // 모달 닫기
  const close = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  // 새로운 대시보드 생성 동작
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <ModalContainer isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className={styles.container}>
        <h1>새로운 대시보드</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.content}>
            <label htmlFor="name">대시보드 이름</label>
            <input type="text" id="name" name="name" placeholder="이름을 입력해 주세요" required />
          </div>

          <div className={styles.colorList}>
            색 리스트 추가
          </div>

          <div className={styles.buttonBlock}>
            <button className={styles.cancelButton} type="button" onClick={close}>취소</button>
            <button className={styles.createButton} type="submit">생성</button>
          </div>
        </form>
      </div>
    </ModalContainer>
  );
}

export default NewDashModal;
