import { useCallback, useState, ReactNode } from 'react';
import DashboardModal from '../pages/modal/DashboardModal/DashboardModal';

/* 
  모달의 렌더링 여부가 결정되는 state 생략을 위한 Dashboard hook입니다.
  DashboardModal, open, close 가 리턴되어 사용할 수 있습니다.
  const { DashboardModal, open, close } = useDashboard();
*/

function useDashboard() {
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
    DashboardModal: isOpen
      ? () => <DashboardModal isOpen={isOpen} setIsOpen={setIsOpen} />
      : () => null,
    open,
    close,
    isOpen: isOpen,
  };
}

export default useDashboard;
