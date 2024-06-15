import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import Column from '../Column/Column';
import ColumnContainer from '../Column/ColumnContainer';
import { AddNewColumnBtn } from '../../../../components/Btn/Btn';
import {
  apiGetColumnList,
  apiInquireMyInfo,
  ColumnOverAll,
} from '../../../../api/apiModule';
import styles from './ColumnList.module.scss';
import NewColumnModal from '../../../modal/NewColumnModal/NewColumnModal';

function ColumnList() {
  const [columnList, setColumnList] = useState<ColumnOverAll[]>([]);
  const [errorState, setErrorState] = useState<string | null>(null);
  const [addColumnModalOpen, setAddColumnModalOpen] = useState<boolean>(false);
  const [userId, setUserId] = useState<number>(0);

  const { id: dashboardId } = useParams<{ id: string }>();

  const navigate = useNavigate();

  // 대시보드 목록 조회
  async function getColumnList(id: number) {
    try {
      const res = await apiGetColumnList(id);
      const list = res.data;
      const dashboards = list;
      setColumnList(dashboards);
      setErrorState(null);
    } catch (error) {
      const axiosError = error as AxiosError;
      setErrorState(axiosError.message);
      setColumnList([]);
      navigate('/404');
    }
  }

  useEffect(() => {
    getColumnList(Number(dashboardId));
  }, [dashboardId]);

  // 테스트 아이디 apiLoginRequest({ email: 'test333@codeit.kr', password: 'test1234' });
  // 유저 아이디 조회
  async function getUserId() {
    try {
      const res = await apiInquireMyInfo();
      setUserId(res.id);
    } catch (error) {
      const axiosError = error as AxiosError;
      setErrorState(axiosError.message);
      setUserId(0);
    }
  }
  useEffect(() => {
    getUserId();
  }, [dashboardId]);

  // 버튼 이벤트 핸들러
  const handleAddNewColumn = () => {
    setAddColumnModalOpen(!addColumnModalOpen);
  };

  // 모달에서 응답이 올 시
  const afterSubmit = (): void => {
    getColumnList(Number(dashboardId));
  };

  // 컴포넌트 출력
  return (
    <ColumnContainer>
      <div>{errorState}</div>
      {columnList.map((columnData) => (
        <Column
          key={columnData.id}
          columnId={columnData.id}
          title={columnData.title}
          dashboardId={Number(dashboardId)}
          userId={userId}
          afterSubmit={afterSubmit}
        />
      ))}
      <div className={styles.addColumnButtonContainer}>
        <AddNewColumnBtn handleBtn={handleAddNewColumn} />
      </div>
      {addColumnModalOpen ? (
        <NewColumnModal
          isOpen={addColumnModalOpen}
          setIsOpen={setAddColumnModalOpen}
          dashboardId={Number(dashboardId)}
          afterSubmit={afterSubmit}
        />
      ) : null}
    </ColumnContainer>
  );
}

export default ColumnList;
