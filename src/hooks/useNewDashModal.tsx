import { useCallback, useState } from 'react';
import NewDashModal from '../pages/modal/NewDashModal/NewDashModal';

/*
  모달의 렌더링 여부가 결정되는 state 생략을 위한 NewDashModal hook입니다.
  DashboardModal, open, close 가 리턴되어 사용할 수 있습니다.
  const { NewDashModal, openDash } = useNewDashModal();
*/

function useNewDashModal() {
  const [isOpen, setIsOpen] = useState(false);

  // 모달 열기
  const openDash = useCallback(() => {
    setIsOpen(true);
  }, []);

  return {
    NewDashModal: isOpen
      ? () => <NewDashModal isOpen={isOpen} setIsOpen={setIsOpen} />
      : () => null,
    openDash,
    isOpen,
  };
}

export default useNewDashModal;
