import styles from './index.module.scss';
import Column from './components/Column/Column';
import SideBar from '../../components/sidebar/sidebar';
import GnbHeader from './components/GnbHeader/GnbHeader';
import ProgressState from '../../components/chip/ProgressState/ProgressState';

function DashboardMain() {
  return (
    <div className={styles.container}>
      <SideBar />
      <div className={styles.main}>
        <GnbHeader />
        <div className={styles.contents}>
          <Column />
          <Column />
          <ProgressState content="Done" />
        </div>
      </div>
    </div>
  );
}

export default DashboardMain;
