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
import { UserProvider } from './contexts/UserContext';
import NotFound from './pages/NotFound/NotFound';

/*
페이지 라우팅 분리,
*/
function AppLayout() {
  return (
    <Routes>
      <Route path="/mydashboard" element={<MyDashboard />} />
      <Route path="/dashboard/:id/edit" element={<DashboardEdit />} />
      <Route path="/dashboard/:id" element={<DashboardForId />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route
          path="/*"
          element={(
            <UserProvider>
              <DashboardProvider>
                <AppLayout />
              </DashboardProvider>
            </UserProvider>
          )}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
