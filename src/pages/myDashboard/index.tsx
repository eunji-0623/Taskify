import SideBar from '../../components/sidebar/sidebar';
import { DashboardProvider } from '../../contexts/DashboardContext';
import DashboardList from './components/DashboardList/DashboardList';
import MyDashboardHeader from './components/Header/Header';
import Invited from './components/Invited/Invited';
import styles from './index.module.scss';

/*  나의 대시보드 페이지
    - 전체적인 레이아웃  */

function MyDashboard() {
  return (
    <DashboardProvider>
      <div className={styles.container}>
        <SideBar />
        <div className={styles.main}>
          <MyDashboardHeader />
          <div>
            <DashboardList />
            <Invited />
          </div>
        </div>
      </div>
    </DashboardProvider>
  );
}

export default MyDashboard;
