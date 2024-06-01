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

function App() {
  const { AlertModal, openAlert, closeAlert } = useAlertModal();

  return (
    <div>
      <button type="button" onClick={openAlert}>모달 테스트 버튼</button>
      <AlertModal>
        <p>비밀번호가 일치하지 않습니다.</p>
        <button type="button" onClick={closeAlert}>확인</button>
      </AlertModal>
    </div>
  );
}

export default App;
