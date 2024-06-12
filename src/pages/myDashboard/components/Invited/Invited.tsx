import { useState, useCallback, useEffect } from 'react';
import Search from './Search/Search';
import Table from './Table/Table';
import Empty from './Empty/Empty';
import styles from './Invited.module.scss';
import useInfiniteScroll from '../../../../hooks/pagination/useInfiniteScroll';
import {
  apiInvitationAccept,
  apiMyInvitationsList,
} from '../../../../api/apiModule';

/*  초대받은 대시보드 목록을 보여주기 위한 컴포넌트 입니다
    API 호출을 통해 데이터를 불러온 뒤,
    Table 컴포넌트로 데이터를 전달합니다.  */

interface InvitationResponse {
  id: number;
  inviter: {
    nickname: string;
    email: string;
    id: number;
  };
  teamId: string;
  dashboard: {
    title: string;
    id: number;
  };
  invitee: {
    nickname: string;
    email: string;
    id: number;
  };
  inviteAccepted: boolean;
  createdAt: string;
  updatedAt: string;
}

interface InvitationsListResponse {
  cursorId: number;
  invitations: InvitationResponse[];
}

const PAGE_SIZE = 6;

const fetchInvitations = async (
  cursor: number,
  title: string
): Promise<InvitationsListResponse> => {
  const data = await apiMyInvitationsList({
    size: PAGE_SIZE,
    cursorId: cursor,
    title,
  });
  return {
    invitations: data.invitations,
    cursorId: data.cursorId,
  };
};

function Invited() {
  const [invitations, setInvitations] = useState<InvitationResponse[]>([]);
  const [cursor, setCursor] = useState(0);
  const [title, setTitle] = useState('');
  const [hasNext, setHasNext] = useState(true);
  const [empty, setEmpty] = useState(false);

  const loadMoreInvitations = useCallback(async () => {
    if (!hasNext) return;

    try {
      const newInvitations = await fetchInvitations(cursor, title);
      if (cursor === 0) {
        // 검색어가 변경되어 초기 로드일 경우
        setInvitations(newInvitations.invitations);
      } else {
        setInvitations((prev) => [...prev, ...newInvitations.invitations]);
      }
      setCursor(newInvitations.cursorId);
      if (hasNext && newInvitations.invitations.length === 0) {
        setEmpty(true);
      }
      if (newInvitations.invitations.length <= PAGE_SIZE) {
        setHasNext(false);
      }
    } catch (error) {
      setEmpty(true);
    }
  }, [cursor, hasNext, title]);

  const setElement = useInfiniteScroll(loadMoreInvitations, {
    root: null,
    rootMargin: '20px',
    threshold: 0.5,
  });

  const handleSearch = useCallback((searchWord: string) => {
    setTitle(searchWord);
    setCursor(0);
    setInvitations([]);
    setHasNext(true);
    setEmpty(false);
  }, []);

  useEffect(() => {
    setCursor(0);
    setInvitations([]);
    setHasNext(true);
    loadMoreInvitations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);

  const handleInvitation = async (id: number, isAccept: boolean) => {
    await apiInvitationAccept(
      { invitationId: id },
      { inviteAccepted: isAccept }
    );
    setInvitations((prevInvitations) =>
      prevInvitations.filter((invitation) => invitation.id !== id)
    );

    if (invitations.length - 1 < PAGE_SIZE && hasNext) {
      await loadMoreInvitations();
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>초대받은 대시보드</h2>
      <Search searchingWord={handleSearch} />
      {empty ? (
        <Empty />
      ) : (
        <div className={styles.tableContainer}>
          <Table
            invitations={invitations}
            hasNext={hasNext}
            setElement={setElement}
            handleInvitation={handleInvitation}
          />
        </div>
      )}
    </div>
  );
}

export default Invited;
