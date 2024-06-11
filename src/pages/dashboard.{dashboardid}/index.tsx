import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import styles from './index.module.scss';
import Column from './components/Column/Column';
import ColumnContainer from './components/Column/ColumnContainer';
import { AddNewColumnBtn } from '../../components/Btn/Btn';
import SideBar from '../../components/sidebar/sidebar';
import GnbHeader from './components/GnbHeader/GnbHeader';
import {
  apiGetColumnList,
  apiLoginRequest,
  ColumnOverAll,
} from '../../api/apiModule';

function DashboardMain() {
  const { id } = useParams<{ id: string }>();
  const [columnList, setColumnList] = useState<ColumnOverAll[]>([]);
  const [errorState, setErrorState] = useState<string | null>(null);

  async function getColumnList(dashboardId: number) {
    try {
      const res = await apiGetColumnList(dashboardId);
      const list = res.data;
      const dashboards = list;
      setColumnList(dashboards);
    } catch (error) {
      const axiosError = error as AxiosError;
      setErrorState(axiosError.message);
      setColumnList([]);
    }
  }

  useEffect(() => {
    getColumnList(Number(id));
  }, [id]);

  const handleAddNewColumn = () => {
    apiLoginRequest({ email: 'test333@codeit.kr', password: 'test1234' });
  };

  return (
    <div className={styles.container}>
      <div className={styles.sideMenu}>
        <SideBar />
      </div>
      <div className={styles.gnbHeader}>
        <GnbHeader />
      </div>
      <div className={styles.columns}>
        <ColumnContainer>
          <div>{errorState}</div>
          {columnList.map((columnData) => (
            <Column
              key={columnData.id}
              columnId={columnData.id}
              title={columnData.title}
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
