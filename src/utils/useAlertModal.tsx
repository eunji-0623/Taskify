import { useCallback, useState } from 'react';
import Modal from '../pages/modal/AlertModal/AlertModal';

/*
  const { Modal, open, close } = useModal();

  사용하고 싶은 파일에서 useModal의 Modal, open, close를 가져와서 아래와 같이 사용

  function testFunction() {
    if (조건) {
      open();
    }
  }

  <button onClick={testFunction}>테스트 버튼</button>
  <Modal>
    <p>예시) 비밀번호가 일치하지 않습니다.</p>
    <button onClick={close}>확인</button>
  </Modal>
 */

// hooks폴더로 이동하기
function useModal() {
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
    isOpen: isOpen
  };
}

export default useModal;
