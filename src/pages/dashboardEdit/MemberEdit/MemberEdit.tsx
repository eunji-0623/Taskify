import { useCallback, useState } from 'react';
import { apiMemberList } from '../../../api/apiModule';
import usePagination from '../../../hooks/pagination/usePagination';
import EditHeader from './EditHeader';
import Member from './Member';
import styles from './MemberEdit.module.scss';

/*  대시보드 수정 페이지 중
    구성원 편집을 위한 부분입니다
    - 페이지네이션을 위한 부분과
    - 멤버 목록을 보여주는 table로 구성됩니다  */

const ITEMS_PER_PAGE = 5;

interface Props {
  dashboardId: number;
}

interface MemberResponse {
  id: number;
  userId: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
  isOwner: boolean;
}

function MemberEdit({ dashboardId }: Props) {
  const [reload, setReload] = useState(false);

  const fetchMembers = async (
    id: number,
  ): Promise<{ items: MemberResponse[]; totalCount: number }> => {
    const data = await apiMemberList({ dashboardId: id });
    return {
      items: data.members,
      totalCount: data.totalCount,
    };
  };

  const fetchDataCallback = useCallback(
    () => fetchMembers(dashboardId),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dashboardId, reload],
  );

  const {
    items,
    currentPage,
    totalPages,
    isFirstPage,
    isLastPage,
    handlePrevClick,
    handleNextClick,
  } = usePagination<MemberResponse>({
    fetchData: fetchDataCallback,
    itemsPerPage: ITEMS_PER_PAGE,
  });

  const handleReload = () => {
    setReload(!reload);
  };

  return (
    <div className={styles.container}>
      <EditHeader
        title="구성원"
        isFirstPage={isFirstPage}
        isLastPage={isLastPage}
        currentPage={currentPage}
        totalPages={totalPages}
        handlePrevClick={handlePrevClick}
        handleNextClick={handleNextClick}
        dashboardId={dashboardId}
      />
      <table>
        <thead className={styles.table_head}>
          <tr>
            <td>이름</td>
          </tr>
        </thead>
        <tbody>
          {items.map((member) => (
            <Member
              key={member.id}
              memberId={member.id}
              name={member.nickname}
              profile={member.profileImageUrl}
              isOwner={member.isOwner}
              handleReload={handleReload}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MemberEdit;
