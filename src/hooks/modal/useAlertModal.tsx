import { useCallback, useState } from 'react';
import AlertModal from '../../pages/modal/AlertModal/AlertModal';

/*
  모달의 렌더링 여부가 결정되는 state 생략을 위한 AlertModal hook입니다.
  AlertModal, openAlert 가 리턴되어 사용할 수 있습니다.

  const { AlertModal, openAlert } = useAlertModal();

  <button type="button" onClick={openAlert}>버튼</button>
  <AlertModal modalText="이미 사용 중인 이메일입니다." buttonText="확인" />
*/

interface ModalProps {
  modalText: string;
  buttonText: string;
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
      ? ({ modalText, buttonText }: ModalProps) => (
        <AlertModal isOpen={isOpen} setIsOpen={setIsOpen}>
          <p>{modalText}</p>
          <button type="button" onClick={closeAlert}>{buttonText}</button>
        </AlertModal>
      )
      : () => null,
    openAlert,
    isOpen,
  };
}

export default useAlertModal;
