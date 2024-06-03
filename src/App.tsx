import './styles/reset.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login-signup/login/Login';
import SignUp from './pages/login-signup/signup/SignUp';
import MyPage from './pages/mypage/MyPage';

/*
페이지 라우팅 분리,
*/
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
