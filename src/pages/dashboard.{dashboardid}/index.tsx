import styles from './index.module.scss';
import Column from './components/Column/Column';
import ColumnContainer from './components/Column/ColumnContainer';

function DashboardMain() {
  return (
    <div className={styles.container}>
      <div className={styles.sideMenu}>sidemenu</div>
      <div className={styles.gnbHeader}>gnbHeader</div>
      <div className={styles.columns}>
        <ColumnContainer>
          <Column />
          <Column />
        </ColumnContainer>
      </div>
    </div>
  );
}

export default DashboardMain;
