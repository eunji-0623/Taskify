import './styles/global.scss';
import './styles/reset.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import MyDashboard from './pages/myDashboard';
import DashboardEdit from './pages/dashboardEdit';
import DashboardForId from './pages/dashboard.{dashboardid}';

/*
페이지 라우팅 분리,
*/

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/mydashboard" element={<MyDashboard />} />
        <Route path="/dashboard/1/edit" element={<DashboardEdit />} />
        <Route path="/dashboard/1" element={<DashboardForId />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
