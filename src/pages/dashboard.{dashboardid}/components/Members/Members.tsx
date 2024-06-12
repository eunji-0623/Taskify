import { useState, useEffect } from 'react';
import styles from './Members.module.scss';
import { MembersProfileImg } from '../../../../components/UserProfileImg/UserProfileImg';
import { apiMemberList } from '../../../../api/apiModule';

interface Member {
  id: number;
  userId: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
  isOwner: boolean;
}

interface MemberResponse {
  members: Member[];
  totalCount: number;
}

interface MemberQuery {
  dashboardId: number | undefined;
  page?: number;
  size?: number;
}

const fetchDashboardMembers = async (
  dashboardId: number | undefined,
  page = 1,
  size = 10,
): Promise<MemberResponse> => {
  const query: MemberQuery = { dashboardId, page, size };
  return apiMemberList(query);
};

function Members({ dashboardId }: { dashboardId: number | undefined}) {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getMembers = async () => {
      try {
        const data = await fetchDashboardMembers(dashboardId);
        setMembers(data.members);
      } catch (e) {
        setError((e as Error).message);
      } finally {
        setLoading(false);
      }
    };

    getMembers();
  }, [dashboardId , members]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        멤버 목록을 불러오지 못했습니다:
        {error}
      </div>
    );
  }

  return (
    <div className={styles.Members}>
      {members.map((member) => (
        <MembersProfileImg
          key={member.id}
          isImg={false}
          nickname={member.nickname}
          profileImageUrl="#f0f0f0"
        />
      ))}
    </div>
  );
}

export default Members;
