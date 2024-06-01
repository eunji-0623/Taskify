import { useCallback, useState, ReactNode } from 'react';
import AlertModal from '../pages/modal/AlertModal/AlertModal';

/* 
  모달의 렌더링 여부가 결정되는 state 생략을 위한 AlertModal hook입니다.
  AlertModal, open, close 가 리턴되어 사용할 수 있습니다.
  const { AlertModal, open, close } = useAlertModal();
*/

interface ModalProps {
  children: ReactNode;
}

function useAlertModal() {
  const [isOpen, setIsOpen] = useState(false);

  // 모달 열기
  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  // 모달 닫기
  const close = useCallback(() => {
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
    open,
    close,
    isOpen: isOpen
  };
}

export default useAlertModal;
