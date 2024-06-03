import './styles/global.scss';
import './styles/reset.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import MyDashboard from './pages/myDashboard';
import DashboardEdit from './pages/dashboardEdit';

import ColumnCard from './pages/dashboard.{dashboardid}/components/ColumnCard/ColumnCard';
/*
페이지 라우팅 분리,
*/

function App() {
  const cardProps = {
    imageUrl: '/img/test_img.png',
    assignee: 'unknwon',
    title: '새로운 일정 관리 Taskify',
    dueDate: new Date('2022-03-13 15:23:37'),
    tags: ['프로젝트', '상', '1', '22', '333', '454'],
  };

  return (
    <>
      <ColumnCard {...cardProps} />
      <ColumnCard {...cardProps} />
    </>
  );
}
export default App;
