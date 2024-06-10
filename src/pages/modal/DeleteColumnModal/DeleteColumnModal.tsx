import { useCallback } from 'react';
import ModalContainer from '../ModalContainer/ModalContainer';
import { DeleteBtn, ChangeAndSaveBtn } from '../../../components/Btn/Btn';
import styles from './DeleteColumnModal.module.scss';

/*
  컬럼 삭제할 수 있는 모달입니다.
*/

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

function DeleteColumnModal({ isOpen, setIsOpen }: ModalProps) {
  // 모달 닫기
  const close = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  return (
    <ModalContainer isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className={styles.container}>
        <p>컬럼의 모든 카드가 삭제됩니다.</p>
        <div className={styles.buttonBlock}>
          <DeleteBtn BtnText="취소" handleBtn={close} />
          <ChangeAndSaveBtn BtnText="삭제" handleBtn={close} />
        </div>
      </div>
    </ModalContainer>
  );
}

export default DeleteColumnModal;
