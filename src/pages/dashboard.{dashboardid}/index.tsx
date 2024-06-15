import SideBar from '../../components/sidebar/sidebar';
import GnbHeader from './components/GnbHeader/GnbHeader';
import ColumnList from './components/ColumnList/ColumnList';
import styles from './index.module.scss';

function DashboardMain() {
  return (
    <div className={styles.container}>
      <div className={styles.sideMenu}>
        <SideBar />
      </div>
      <div className={styles.gnbHeader}>
        <GnbHeader />
      </div>
      <div className={styles.columns}>
        <ColumnList />
      </div>
    </div>
  );
}

export default DashboardMain;
