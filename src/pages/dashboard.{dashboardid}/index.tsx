import styles from './index.module.scss';
import Column from './components/Column/Column';
import SideBar from '../../components/sidebar/sidebar';
import { DashboardProvider } from '../../contexts/DashboardContext';
import GnbHeader from './components/GnbHeader/GnbHeader';

function DashboardMain() {
  return (
    <DashboardProvider>
      <div className={styles.container}>
        <SideBar />
        <div className={styles.main}>
          <GnbHeader />
          <div className={styles.contents}>
            <Column />
            <Column />
          </div>
        </div>
      </div>
    </DashboardProvider>
  );
}

export default DashboardMain;
