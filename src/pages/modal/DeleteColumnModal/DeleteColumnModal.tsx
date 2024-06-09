import { useCallback } from 'react';
import ModalContainer from '../ModalContainer/ModalContainer';
import { DeleteBtn, ChangeAndSaveBtn } from '../../../components/Btn/Btn';
import styles from './DeleteColumnModal.module.scss';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  openEditModal: () => void;
}

function DeleteColumnModal({ isOpen, setIsOpen, openEditModal }: ModalProps) {
  // 컬럼의 모든 카드를 삭제하는 동작으로 변경하기
  const close = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  // 취소를 클릭하면 컬럼 관리 모달로 돌아갑니다.
  const handleDelete = useCallback(() => {
    openEditModal();
  }, [openEditModal]);

  return (
    <ModalContainer isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className={styles.container}>
        <p>컬럼의 모든 카드가 삭제됩니다.</p>
        <div className={styles.buttonBlock}>
          <DeleteBtn BtnText="취소" handleBtn={handleDelete} />
          <ChangeAndSaveBtn BtnText="삭제" handleBtn={close} />
        </div>
      </div>
    </ModalContainer>
  );
}

export default DeleteColumnModal;
