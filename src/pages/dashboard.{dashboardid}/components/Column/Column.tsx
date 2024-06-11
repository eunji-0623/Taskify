import { useEffect, useRef, useState } from 'react';
import { AxiosError } from 'axios';
import styles from './Column.module.scss';
import ColumnCard from '../ColumnCard/ColumnCard';
import ColumnHeader from '../ColumnHeader/ColumnHeader';
import { AddNewTaskBtn } from '../../../../components/Btn/Btn';
import { apiGetCardList, CardOverAll } from '../../../../api/apiModule';
import useInfiniteScroll from '../../../../hooks/pagination/useInfiniteScroll';

interface ColumnProps {
  title: string;
  columnId: number;
}
function Column({ title, columnId }: ColumnProps) {
  const handleAddTaskBtn = () => {};
  const [cardList, setCardList] = useState<CardOverAll[]>([]);
  const [cursor, setCursor] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [hasNext, setHasNext] = useState(true);
  const [errorState, setErrorState] = useState<string | null>(null);

  // 스크롤 관련 ref
  const columnRef = useRef<HTMLDivElement>(null);

  // 다음에 불러오는 카드 수
  const PAGE_SIZE = 5;

  console.log(columnId);
  const getFirstCardList = async () => {
    try {
      const res = await apiGetCardList({ columnId });
      const firstList = res.cards;
      setCursor(res.cursorId);
      setTotalCount(res.totalCount);
      setCardList(firstList);
      if (firstList.length < 10) setHasNext(false);
    } catch (error) {
      const axiosError = error as AxiosError;
      setErrorState(axiosError.message || '목록을 가져오는데 실패했습니다');
    }
  };

  const getMoreCardList = async () => {
    try {
      const res = await apiGetCardList({
        size: PAGE_SIZE,
        cursorId: cursor,
        columnId,
      });
      const moreList = res.cards;
      setCursor(res.cursorId);
      setCardList((prevList) => [...prevList, ...moreList]);
      if (moreList.length < PAGE_SIZE) setHasNext(false);
    } catch (error) {
      const axiosError = error as AxiosError;
      setErrorState(axiosError.message || '목록을 가져오는데 실패했습니다');
    }
  };

  const setElement = useInfiniteScroll(getMoreCardList, {
    root: null,
    rootMargin: '20px',
    threshold: 0.5,
  });

  useEffect(() => {
    getFirstCardList();
  });

  // 스크롤을 맨 위로 초기화
  const handleHeaderClick = () => {
    if (columnRef.current) {
      columnRef.current.scrollTop = 0;
    }
  };

  return (
    <div className={styles.container}>
      <div>{errorState}</div>
      <div className={styles.columnHeaderContainer}>
        <ColumnHeader
          name={title}
          totalNum={totalCount}
          onClick={handleHeaderClick}
        />
      </div>
      <div className={styles.addTaskButtonContainer}>
        <AddNewTaskBtn handleBtn={handleAddTaskBtn} />
      </div>
      {cardList.map((cardData) => (
        <ColumnCard
          key={cardData.id}
          assignee={cardData.assignee.nickname}
          title={cardData.title}
          dueDate={cardData.dueDate}
          tags={cardData.tags}
          imageUrl={cardData?.imageUrl}
        />
      ))}
      {hasNext && <div ref={setElement} style={{ height: '50px' }} />}
    </div>
  );
}

export default Column;
