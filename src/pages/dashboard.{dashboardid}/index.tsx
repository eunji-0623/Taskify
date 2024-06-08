import styles from './index.module.scss';
import Column from './components/Column/Column';
import ColumnContainer from './components/Column/ColumnContainer';
import { AddNewColumnBtn } from '../../components/Btn/Btn';

function DashboardMain() {
  const handleAddNewColumn = () => {};
  return (
    <div className={styles.container}>
      <div className={styles.sideMenu}>sidemenu</div>
      <div className={styles.gnbHeader}>gnbHeader</div>
      <div className={styles.columns}>
        <ColumnContainer>
          <Column />
          <Column />
          <div className={styles.addColumnButtonContainer}>
            <AddNewColumnBtn handleBtn={handleAddNewColumn} />
          </div>
        </ColumnContainer>
      </div>
    </div>
  );
}

export default DashboardMain;
