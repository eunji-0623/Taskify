// import { useCallback, useState } from 'react';
// import DashboardModal from '../pages/modal/DashboardModal/DashboardModal';

// /*
//   모달의 렌더링 여부가 결정되는 state 생략을 위한 Dashboard hook입니다.
//   DashboardModal, open, close 가 리턴되어 사용할 수 있습니다.
//   const { DashboardModal, open, close } = useDashboard();
// */

// function useDashboardModal() {
//   const [isOpen, setIsOpen] = useState(false);

//   // 모달 열기
//   const openDashboard = useCallback(() => {
//     setIsOpen(true);
//   }, []);

//   return {
//     DashboardModal: isOpen
//       ? () => <DashboardModal isOpen={isOpen} setIsOpen={setIsOpen} />
//       : () => null,
//     openDashboard,
//     isOpen,
//   };
// }

// export default useDashboardModal;
