import styles from './index.module.scss';
import Column from './components/Column/Column';
import SideBar from '../../components/sidebar/sidebar';
import GnbHeader from './components/GnbHeader/GnbHeader';

function DashboardMain() {
  return (
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
  );
}

export default DashboardMain;
