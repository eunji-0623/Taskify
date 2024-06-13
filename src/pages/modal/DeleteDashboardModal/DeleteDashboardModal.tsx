import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ModalContainer from '../ModalContainer/ModalContainer';
import { DeleteBtn, ChangeAndSaveBtn } from '../../../components/Btn/Btn';
import styles from './DeleteDashboardModal.module.scss';
import { apiDeleteDashboards } from '../../../api/apiModule';

/*
  컬럼 삭제할 수 있는 모달입니다.
*/

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  dashboardId: number;
}

function DeleteDashboardModal({ isOpen, setIsOpen, dashboardId }: ModalProps) {
  const navigate = useNavigate();
  // 모달 닫기
  const close = useCallback(() => {
    setIsOpen(false);
    window.location.reload();
  }, [setIsOpen]);

  const handleDeleteButton = async () => {
    await apiDeleteDashboards({ dashboardId });
    navigate('/myDashboard');
  };

  return (
    <ModalContainer isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className={styles.container}>
        <p>정말로 대시보드를 삭제하시겠습니까?</p>
        <div className={styles.buttonBlock}>
          <DeleteBtn BtnText="취소" handleBtn={close} />
          <ChangeAndSaveBtn BtnText="삭제" handleBtn={handleDeleteButton} />
        </div>
      </div>
    </ModalContainer>
  );
}

export default DeleteDashboardModal;
