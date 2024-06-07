import { useCallback } from 'react';
import ModalContainer from '../ModalContainer/ModalContainer';
import { DeleteBtn, ChangeAndSaveBtn } from '../../../components/Btn/Btn';
import styles from './EditColumnModal.module.scss';

/*
  컬럼을 수정하는 모달입니다.
*/

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

function EditColumnModal({ isOpen, setIsOpen }: ModalProps) {
  // 모달 닫기
  const close = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  // 컬럼 변경 버튼 클릭 동작
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <ModalContainer isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className={styles.container}>
        <h1>컬럼 관리</h1>
        <form className={styles.content} onSubmit={handleSubmit}>
          <div className={styles.title}>
            <label htmlFor="name">이름</label>
            <input className={styles.inputText} type="text" id="name" name="name" required />
          </div>

          <button className={styles.delete} type="button" onClick={close}>삭제하기</button>

          <div className={styles.buttonBlock}>
            <div className={styles.buttons}>
              <DeleteBtn BtnText="취소" handleBtn={close} />
              <ChangeAndSaveBtn BtnText="변경" handleBtn={close} />
            </div>
          </div>
        </form>
      </div>
    </ModalContainer>
  );
}

export default EditColumnModal;
