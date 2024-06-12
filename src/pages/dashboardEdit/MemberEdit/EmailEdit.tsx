import { useCallback } from 'react';
import EditHeader from './EditHeader';
import Email from './Email';
import styles from './MemberEdit.module.scss';
import { apiInvitationList } from '../../../api/apiModule';
import usePagination from '../../../hooks/pagination/usePagination';

/*  대시보드 수정 페이지 중
    초대 내역 편집을 위한 부분입니다
    - 페이지네이션을 위한 부분과
    - 보낸 초대 목록을 보여주는 table로 구성됩니다  */

const ITEMS_PER_PAGE = 5;

interface Props {
  dashboardId: number;
}

interface EmailResponse {
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

function EmailEdit({ dashboardId }: Props) {
  const fetchInvitations = async (
    id: number,
    page: number
  ): Promise<{ items: EmailResponse[]; totalCount: number }> => {
    const data = await apiInvitationList(
      { dashboardId: id },
      { page, size: ITEMS_PER_PAGE }
    );
    return {
      items: data.invitations,
      totalCount: data.totalCount,
    };
  };

  const fetchDataCallback = useCallback(
    () => fetchInvitations(dashboardId, 1),
    [dashboardId]
  );

  const {
    items,
    currentPage,
    totalPages,
    isFirstPage,
    isLastPage,
    handlePrevClick,
    handleNextClick,
  } = usePagination<EmailResponse>({
    fetchData: fetchDataCallback,
    itemsPerPage: ITEMS_PER_PAGE,
  });

  return (
    <div className={styles.container}>
      <EditHeader
        title="초대 내역"
        hasButton
        isFirstPage={isFirstPage}
        isLastPage={isLastPage}
        currentPage={currentPage}
        totalPages={totalPages}
        handlePrevClick={handlePrevClick}
        handleNextClick={handleNextClick}
      />
      <table>
        <thead className={styles.table_head}>
          <tr>
            <td>이메일</td>
          </tr>
        </thead>
        <tbody>
          {items.map((email) => (
            <Email
              key={email.id}
              email={email.invitee.email}
              dashboardId={dashboardId}
              invitationId={email.id}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmailEdit;
