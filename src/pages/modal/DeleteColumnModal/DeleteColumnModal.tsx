import { useCallback } from 'react';
import ModalContainer from '../ModalContainer/ModalContainer';
import { apiDeleteColumn } from '../../../api/apiModule';
import { DeleteBtn, ChangeAndSaveBtn } from '../../../components/Btn/Btn';
import styles from './DeleteColumnModal.module.scss';

/*
  컬럼의 모든 카드를 삭제하는 모달입니다.

  컬럼 관리 모달과 연결을 위해 직접 사용하는 것이 아닌 EditColumnManagement를 통해 사용합니다.
*/

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  openEditModal: () => void;
  columnId: number;
  afterSubmit: () => void;
}

function DeleteColumnModal({
  isOpen,
  setIsOpen,
  openEditModal,
  columnId,
  afterSubmit,
}: ModalProps) {
  // 컬럼의 모든 카드를 삭제하는 동작
  const apiDelete = async () => {
    try {
      await apiDeleteColumn(columnId);
      setIsOpen(false);
    } catch (error) {
      throw new Error('error');
    }
    afterSubmit();
  };

  // 취소를 클릭하면 컬럼 관리 모달로 돌아갑니다.
  const handleClose = useCallback(() => {
    openEditModal();
  }, [openEditModal]);

  return (
    <ModalContainer isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className={styles.container}>
        <p>컬럼의 모든 카드가 삭제됩니다.</p>
        <div className={styles.buttonBlock}>
          <DeleteBtn BtnText="취소" handleBtn={handleClose} />
          <ChangeAndSaveBtn BtnText="삭제" handleBtn={apiDelete} />
        </div>
      </div>
    </ModalContainer>
  );
}

export default DeleteColumnModal;
