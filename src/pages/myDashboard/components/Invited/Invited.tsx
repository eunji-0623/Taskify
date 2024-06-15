import { useState, useCallback } from 'react';
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
  title: string,
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
    if (!hasNext) {
      if (invitations.length === 0) {
        setEmpty(true);
      }
      return;
    }

    try {
      const newInvitations = await fetchInvitations(cursor, title);
      if (
        hasNext
        && newInvitations.invitations.length === 0
        && invitations.length === 0
      ) {
        setEmpty(true);
      }

      // 중복 초대 필터링
      const filteredInvitations = newInvitations.invitations.filter(
        (invitation) => !invitations.some(
          (existingInvitation) => existingInvitation.inviter.id === invitation.inviter.id
              && existingInvitation.dashboard.id === invitation.dashboard.id,
        ),
      );

      if (cursor === 0) {
        // 검색어가 변경되어 초기 로드일 경우
        setInvitations(filteredInvitations);
      } else {
        setInvitations((prev) => [...prev, ...filteredInvitations]);
      }

      setCursor(newInvitations.cursorId);
      if (filteredInvitations.length === 0) {
        setHasNext(false);
      }
      if (newInvitations.invitations.length < PAGE_SIZE) {
        setHasNext(false);
      }
    } catch (error) {
      setEmpty(true);
    }
  }, [cursor, hasNext, title, invitations]);

  const setElement = useInfiniteScroll(loadMoreInvitations, {
    root: null,
    rootMargin: '20px',
    threshold: 0.5,
  });

  const handleSearch = useCallback(
    (searchWord: string) => {
      setTitle(searchWord);
      setCursor(0);
      setInvitations([]);
      setHasNext(true);
      setEmpty(false);
      loadMoreInvitations();
    },
    [loadMoreInvitations],
  );

  const handleInvitation = async (
    id: number,
    inviterId: number,
    dashboardId: number,
    dashboardName: string,
    isAccept: boolean,
  ) => {
    await apiInvitationAccept(
      { invitationId: id },
      { inviteAccepted: isAccept },
    );

    // 초대 수락 시
    if (isAccept) {
      const response = await apiMyInvitationsList({
        cursorId: 0,
        title: dashboardName,
        size: 100,
      });
      // 중복 초대 중 하나 수락 시 나머지 초대 모두 거절로 처리
      const promises = response.invitations.map(async (invitation) => {
        if (
          invitation.inviter.id === inviterId
          && invitation.dashboard.id === dashboardId
        ) {
          await apiInvitationAccept(
            { invitationId: invitation.id },
            { inviteAccepted: false },
          );
        }
      });

      await Promise.all(promises);

      setInvitations((prev) => prev.filter(
        (invitation) => invitation.id !== id
            && !(
              invitation.inviter.id === inviterId
              && invitation.dashboard.id === dashboardId
            ),
      ));
      window.location.reload();
    }

    setInvitations((prev) => prev.filter((invitation) => invitation.id !== id));
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
