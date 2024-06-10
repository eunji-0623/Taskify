import { useCallback, useState, ReactNode } from 'react';
import AlertModal from '../pages/modal/AlertModal/AlertModal';

/*
  모달의 렌더링 여부가 결정되는 state 생략을 위한 AlertModal hook입니다.
  AlertModal, openAlert, closeAlert 가 리턴되어 사용할 수 있습니다.
  const { AlertModal, openAlert, closeAlert } = useAlertModal();
*/

interface ModalProps {
  children: ReactNode;
}

function useAlertModal() {
  const [isOpen, setIsOpen] = useState(false);

  // 모달 열기
  const openAlert = useCallback(() => {
    setIsOpen(true);
  }, []);

  // 모달 닫기
  const closeAlert = useCallback(() => {
    setIsOpen(false);
  }, []);

  return {
    AlertModal: isOpen
      ? ({ children }: ModalProps) => (
        <AlertModal isOpen={isOpen} setIsOpen={setIsOpen}>
          {children}
        </AlertModal>
      )
      : () => null,
    openAlert,
    closeAlert,
    isOpen,
  };
}

export default useAlertModal;