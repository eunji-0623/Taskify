import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import Column from '../Column/Column';
import ColumnContainer from '../Column/ColumnContainer';
import { AddNewColumnBtn } from '../../../../components/Btn/Btn';
import {
  apiGetColumnList,
  ColumnOverAll,
  apiLoginRequest,
} from '../../../../api/apiModule';
import styles from './ColumnList.module.scss';

interface ColumnListProps {
  dashboardId: number;
}

function ColumnList({ dashboardId }: ColumnListProps) {
  const [columnList, setColumnList] = useState<ColumnOverAll[]>([]);
  const [errorState, setErrorState] = useState<string | null>(null);

  async function getColumnList(id: number) {
    try {
      const res = await apiGetColumnList(id);
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
    getColumnList(dashboardId);
  }, [dashboardId]);

  const handleAddNewColumn = () => {
    // 테스트용 코드. 수정 필요
    apiLoginRequest({ email: 'test333@codeit.kr', password: 'test1234' });
  };

  return (
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
  );
}

export default ColumnList;
