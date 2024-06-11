import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import styles from './index.module.scss';
import Column from './components/Column/Column';
import ColumnContainer from './components/Column/ColumnContainer';
import { AddNewColumnBtn } from '../../components/Btn/Btn';
// import SideBar from '../../components/sidebar/side/bar';
import GnbHeader from './components/GnbHeader/GnbHeader';
import { apiGetColumnList, ColumnOverAll } from '../../api/apiModule';

function DashboardMain() {
  const { dashboardId } = useParams<{ dashboardId: string }>();
  const [columnList, setColumnList] = useState<ColumnOverAll[]>([]);
  const [errorState, setErrorState] = useState<string | null>(null);

  async function getColumnList(id: number) {
    try {
      const res = await apiGetColumnList(id);
      const data = res.data.dashboards;
      setColumnList(data);
    } catch (error) {
      const axiosError = error as AxiosError;
      setErrorState(axiosError.message);
      setColumnList([]);
    }
  }

  useEffect(() => {
    getColumnList(Number(dashboardId));
  }, [dashboardId]);

  const handleAddNewColumn = () => {};
  // const handleColumnClick = () => {};
  return (
    <div className={styles.container}>
      <div className={styles.sideMenu}>SideBar</div>
      <div className={styles.gnbHeader}>
        <GnbHeader />
      </div>
      <div className={styles.columns}>
        <ColumnContainer>
          <div>{errorState}</div>
          {columnList.map((columnData) => (
            <Column
              key={columnData.id}
              title={columnData.title}
              // onClick={handleColumnClick}
            />
          ))}
          <div className={styles.addColumnButtonContainer}>
            <AddNewColumnBtn handleBtn={handleAddNewColumn} />
          </div>
        </ColumnContainer>
      </div>
    </div>
  );
}

export default DashboardMain;
