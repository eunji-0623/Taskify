import { useEffect, useRef, useState } from 'react';
import { AxiosError } from 'axios';
import styles from './Column.module.scss';
import ColumnHeader from '../ColumnHeader/ColumnHeader';
import { AddNewTaskBtn } from '../../../../components/Btn/Btn';
import { apiGetCardList, CardOverAll } from '../../../../api/apiModule';
import useInfiniteScroll from '../../../../hooks/pagination/useInfiniteScroll';
import CardList from '../CardList/CardList';
import EditColumnManagement from '../../../modal/EditColumnManagement/EditColumnManagement';
import NewTodoModal from '../../../modal/NewTodoModal/NewTodoModal';

interface ColumnProps {
  title: string;
  columnId: number;
  dashboardId: number;
  userId: number;
  afterSubmit: ()=> void;
}
interface ColumnData {
  userId: number;
  columnId: number;
  dashboardId: number;
}

function Column({
  title,
  columnId,
  dashboardId,
  userId,
  afterSubmit: changeColumnName,
}: ColumnProps) {
  const [cardList, setCardList] = useState<CardOverAll[]>([]);
  const [columnData, setColumnData] = useState<ColumnData>({
    userId: 0,
    columnId: 0,
    dashboardId: 0,
  });
  const [cursor, setCursor] = useState<number | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [hasNext, setHasNext] = useState(false);
  const [errorState, setErrorState] = useState<string | null>(null);
  const [settingModalOpen, setSettingModalOpen] = useState<boolean>(false);
  const [addCardModalOpen, setAddCardModalOpen] = useState<boolean>(false);

  // 스크롤 관련 ref
  const columnRef = useRef<HTMLDivElement>(null);

  // 다음에 불러오는 카드 수
  const PAGE_SIZE = 5;

  // 처음 카드 목록을 조회
  const getFirstCardList = async () => {
    try {
      const res = await apiGetCardList({ size: 10, columnId });
      const firstList = res.cards;
      setCursor(res.cursorId);
      setTotalCount(res.totalCount);
      setCardList(firstList);
      if (firstList.length < 10) {
        setHasNext(false);
      } else setHasNext(true);
    } catch (error) {
      const axiosError = error as AxiosError;
      setErrorState(axiosError.message || '목록을 가져오는데 실패했습니다');
    }
  };

  useEffect(() => {
    getFirstCardList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 이후의 카드 목록을 조회
  const getMoreCardList = async () => {
    try {
      const res = await apiGetCardList({
        size: PAGE_SIZE,
        cursorId: cursor,
        columnId,
      });
      const moreList = res.cards;
      setCursor(res.cursorId);
      setTotalCount(res.totalCount);
      setCardList((prevList) => [...prevList, ...moreList]);
      if (moreList.length < PAGE_SIZE) setHasNext(false);
      else setHasNext(true);
    } catch (error) {
      const axiosError = error as AxiosError;
      setErrorState(axiosError.message || '목록을 가져오는데 실패했습니다');
    }
  };

  // 무한스크롤 구현용 컴포넌트
  const setElement = useInfiniteScroll(getMoreCardList, {
    root: null,
    rootMargin: '50px',
    threshold: 0.5,
  });

  // 컬럼 데이터 prop 전달용
  useEffect(() => {
    setColumnData({
      userId,
      columnId,
      dashboardId,
    });
  }, [userId, columnId, dashboardId]);

  // 버튼 이벤트 핸들러

  const scrollToTop = () => {
    if (columnRef.current) {
      // 스크롤을 맨 위로 초기화
      columnRef.current.scrollTop = 0;
    }
  };
  const handleSettingOnClick = () => {
    setSettingModalOpen(!settingModalOpen);
  };
  const handleAddTaskBtn = () => {
    setAddCardModalOpen(!addCardModalOpen);
  };

  // 모달 응답
  const afterSubmit = () => {
    setCardList([]);
    setCursor(null);
    getFirstCardList();
  };

  // 컴포넌트 출력
  return (
    <div className={styles.container}>
      <div>{errorState}</div>
      <div className={styles.columnHeaderContainer}>
        <ColumnHeader
          name={title}
          totalNum={totalCount}
          scrollToTop={scrollToTop}
          handleSettingOnClick={handleSettingOnClick}
        />
      </div>
      <div className={styles.addTaskButtonContainer}>
        <AddNewTaskBtn handleBtn={handleAddTaskBtn} />
      </div>
      <CardList
        cardList={cardList}
        hasNext={hasNext}
        setElement={setElement}
        columnData={columnData}
        afterSubmit={afterSubmit}
      />
      {settingModalOpen ? (
        <EditColumnManagement
          isOpen={settingModalOpen}
          setIsOpen={setSettingModalOpen}
          dashboardId={Number(dashboardId)}
          columnId={columnId}
          columnTitle={title}
          afterSubmit={changeColumnName}
        />
      ) : null}
      {addCardModalOpen ? (
        <NewTodoModal
          isOpen={addCardModalOpen}
          setIsOpen={setAddCardModalOpen}
          columnId={columnId}
          dashboardId={Number(dashboardId)}
          userId={userId}
          afterSubmit={afterSubmit}
        />
      ) : null}
    </div>
  );
}

export default Column;
