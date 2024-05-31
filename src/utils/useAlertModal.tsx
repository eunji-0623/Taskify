import { useCallback, useState } from 'react';
import Modal from '../pages/modal/AlertModal/AlertModal';

// hooks폴더로 이동하기
const useModal = () => {
  // 모달의 렌더링 여부를 설정할 상태 값
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
      ? ({ children }) => (
          <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
            {children}
          </Modal>
        )
      : () => null,
    open,
    close,
    isOpen: isOpen,
  };
};

export default useModal;
