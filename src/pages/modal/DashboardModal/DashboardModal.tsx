import ModalContainer from '../ModalContainer/ModalContainer';

/*
  대시보드 생성하는 모달입니다.
  isOpen, setIsOpen을 props로 받습니다.
*/

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

function DashboardModal({ isOpen, setIsOpen }: ModalProps) {
  return (
    <ModalContainer isOpen={isOpen} setIsOpen={setIsOpen}>
      테스트
    </ModalContainer>
  );
}

export default DashboardModal;
