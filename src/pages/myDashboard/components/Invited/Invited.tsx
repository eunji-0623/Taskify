import Search from './Search/Search';
import Table from './Table/Table';
// import Empty from './Empty/Empty';
import styles from './Invited.module.scss';
import { useState, useCallback } from 'react';
import useInfiniteScroll from '../../../../hooks/useInfiniteScroll';

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
  const response = await fetch(`/mockData/invitation.json`);
  const data = await response.json();
  const testData = data.invitations.slice(cursor, cursor + PAGE_SIZE);
  return testData;
};

function Invited() {
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [cursor, setCursor] = useState(0);
  const [hasNext, setHasNext] = useState(true);

  const loadMoreInvitations = useCallback(async () => {
    if (!hasNext) return;

    try {
      const newInvitations = await fetchInvitations(cursor);
      setInvitations((prev) => [...prev, ...newInvitations]);
      setCursor((prev) => prev + PAGE_SIZE);
      if (newInvitations.length < PAGE_SIZE) {
        setHasNext(false);
      }
    } catch (error) {
      console.error('Error fetching invitations:', error);
    }
  }, [cursor, hasNext]);

  const setElement = useInfiniteScroll(loadMoreInvitations, {
    root: null,
    rootMargin: '20px',
    threshold: 1.0,
  });

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>초대받은 대시보드</h2>
      <Search />
      <div className={styles.tableContainer}>
        <Table
          invitations={invitations}
          hasNext={hasNext}
          setElement={setElement}
        />
      </div>
      {/* <Empty /> */}
    </div>
  );
}

export default Invited;
