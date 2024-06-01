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

// 테스트 삭제하기
import useAlertModal from './hooks/useAlertModal';

function App() {
  const { Modal, open, close } = useAlertModal();
  // const test = 1;

  // function testFunction() {
  //   if (test === 1) {
  //     open();
  //   }
  // }

  return (
    <div>
      <button onClick={open}>모달 테스트 버튼</button>
      <Modal>
        <p>비밀번호가 일치하지 않습니다.</p>
        <button onClick={close}>확인</button>
      </Modal>
    </div>
  );
}

export default App;
