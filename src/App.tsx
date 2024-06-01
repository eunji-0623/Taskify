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
import useDashboardModal from './hooks/useDashboardModal';

function App() {
  const { DashboardModal, open, close } = useDashboardModal();

  return (
    <div>
      <button onClick={open}>모달 테스트 버튼</button>
    </div>
  );
}

export default App;
