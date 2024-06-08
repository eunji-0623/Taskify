import styles from './index.module.scss';
import Column from './components/Column/Column';
import ProgressState from '../../components/chip/ProgressState/ProgressState';

function DashboardMain() {
  return (
    <div className={styles.container}>
      <div>sidemenu</div>
      <div>
        <div>gnbheader</div>
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
