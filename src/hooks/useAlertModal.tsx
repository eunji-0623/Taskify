import { useCallback, useState, ReactNode } from 'react';
import Modal from '../pages/modal/AlertModal/AlertModal';

interface ModalProps {
  children: ReactNode;
}

/** 추가
 */
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
    Modal: isOpen
      ? ({ children }: ModalProps) => (
          <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
            {children}
          </Modal>
        )
      : () => null,
    open,
    close,
    isOpen: isOpen
  };
}

export default useAlertModal;
