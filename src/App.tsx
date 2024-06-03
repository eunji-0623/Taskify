// import './styles/global.scss';
// import './styles/reset.scss';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Home from './pages/Home/Home';

// /*
// 페이지 라우팅 분리,
// */

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route index element={<Home />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }
// export default App;

import useAlertModal from './hooks/useAlertModal';
import useNewDashModal from './hooks/useNewDashModal';
import useNewColumnModal from './hooks/useNewColumnModal';
import useEditColumnModal from './hooks/useEditColumnModal';
import useDeleteColumnModal from './hooks/useDeleteColumnModal';
import useInviteModal from './hooks/useInviteModal';
import EditColumnModal from './pages/modal/EditColumnModal/EditColumnModal';

function App() {
  const { NewDashModal, openDash } = useNewDashModal();
  const { AlertModal, openAlert, closeAlert } = useAlertModal();
  const { NewColumnModal, openNewColumn } = useNewColumnModal();
  const { EditColumnModal, openEditColumn } = useEditColumnModal();
  const { DeleteColumnModal, openDeleteColumn } = useDeleteColumnModal();
  const { InviteModal, openInvite } = useInviteModal();

  return (
    <div>
      <button type="button" onClick={openAlert}>Alert 모달 테스트 버튼</button>
      <AlertModal>
        <p>이미 사용 중인 이메일입니다.</p>
        <button type='button' onClick={closeAlert}>확인</button>
      </AlertModal>

      <button type="button" onClick={openDash}>+ 버튼</button>
      <NewDashModal />

      <button type='button' onClick={openNewColumn}>컬럼 추가 버튼</button>
      <NewColumnModal />

      <button type='button' onClick={openEditColumn}>컬럼 관리 버튼</button>
      <EditColumnModal />

      <button type='button' onClick={openDeleteColumn}>컬럼 삭제 버튼</button>
      <DeleteColumnModal />

      <button type='button' onClick={openInvite}>초대 버튼</button>
      <InviteModal />
    </div>
  );
}

export default App;
