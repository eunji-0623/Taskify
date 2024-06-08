import { useState, useCallback } from 'react';
import Search from './Search/Search';
import Table from './Table/Table';
import Empty from './Empty/Empty';
import styles from './Invited.module.scss';
import useInfiniteScroll from '../../../../hooks/pagination/useInfiniteScroll';

/*  초대받은 대시보드 목록을 보여주기 위한 컴포넌트 입니다
    API 호출을 통해 데이터를 불러온 뒤,
    Table 컴포넌트로 데이터를 전달합니다.  */

interface Invitation {
  id: number;
  inviter: {
    nickname: string;
  };
  dashboard: {
    title: string;
  };
}

const PAGE_SIZE = 6;

const fetchInvitations = async (cursor: number): Promise<Invitation[]> => {
  // mockData 사용. 추후 변경 필요
  const response = await fetch('/mockData/invitation.json');
  const data = await response.json();
  const testData = data.invitations.slice(cursor, cursor + PAGE_SIZE);
  return testData;
};

function Invited() {
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [cursor, setCursor] = useState(0);
  const [hasNext, setHasNext] = useState(true);
  const [empty, setEmpty] = useState(false);

  const loadMoreInvitations = useCallback(async () => {
    if (!hasNext) return;

    try {
      const newInvitations = await fetchInvitations(cursor);
      setInvitations((prev) => [...prev, ...newInvitations]);
      setCursor((prev) => prev + PAGE_SIZE);
      console.log(cursor);
      if (hasNext && newInvitations.length === 0) {
        setEmpty(true);
      }
      if (newInvitations.length < PAGE_SIZE) {
        setHasNext(false);
      }
    } catch (error) {
      setEmpty(true);
    }
  }, [cursor, hasNext]);

  const setElement = useInfiniteScroll(loadMoreInvitations, {
    root: null,
    rootMargin: '20px',
    threshold: 1.0,
  });

  return (
    <div className={styles.container}>
      {empty ? (
        <Empty />
      ) : (
        <>
          <h2 className={styles.title}>초대받은 대시보드</h2>
          <Search />
          <div className={styles.tableContainer}>
            <Table
              invitations={invitations}
              hasNext={hasNext}
              setElement={setElement}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Invited;
