import styles from './index.module.scss';
import Column from './components/Column/Column';

function DashboardMain() {
  return (
    <div className={styles.container}>
      <div>sidemenu</div>
      <div>
        <div>gnbheader</div>
        <div className={styles.contents}>
          <Column />
          <Column />
        </div>
      </div>
    </div>
  );
}

export default DashboardMain;
