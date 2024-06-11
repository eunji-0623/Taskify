import './styles/global.scss';
import './styles/reset.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import MyDashboard from './pages/myDashboard';
import DashboardEdit from './pages/dashboardEdit';
import DashboardForId from './pages/dashboard.{dashboardid}';
import Login from './pages/login-signup/login/Login';
import SignUp from './pages/login-signup/signup/SignUp';
import MyPage from './pages/mypage/MyPage';
import { DashboardProvider } from './contexts/DashboardContext';

/*
페이지 라우팅 분리,
*/

function App() {
  return (
    <BrowserRouter>
      <DashboardProvider>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/mydashboard" element={<MyDashboard />} />
          <Route path="/dashboard/1/edit" element={<DashboardEdit />} />
          <Route path="/dashboard/:id" element={<DashboardForId />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </DashboardProvider>
    </BrowserRouter>
  );
}
export default App;
