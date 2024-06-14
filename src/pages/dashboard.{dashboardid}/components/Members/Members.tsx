import { useState, useEffect } from 'react';
import styles from './Members.module.scss';
import { MembersProfileImg } from '../../../../components/UserProfileImg/UserProfileImg';
import { apiMemberList } from '../../../../api/apiModule';
import MoreMembers from './MoreMembers';
/*
대시보드에 초대된 멤버 목록을 보여주는 컴포넌트 입니다.
초과된 멤버의 경우 +N으로 표시됩니다.
임시로 randomColorPicker 사용
*/

const maxShowMember = {
  pcSize: 4,
  tabletSize: 3,
  mobileSize: 2,
};

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

function Members({ dashboardId }: { dashboardId: number | undefined }) {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [maxMembersToShow, setMaxMembersToShow] = useState(maxShowMember.pcSize);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024 && window.innerWidth > 768) {
        setMaxMembersToShow(maxShowMember.tabletSize);
      } else if (window.innerWidth <= 768) {
        setMaxMembersToShow(maxShowMember.mobileSize);
      } else {
        setMaxMembersToShow(maxShowMember.pcSize);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
  }, [dashboardId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        멤버 목록을 불러오지 못했습니다:
      </div>
    );
  }

  const extraMembersCount = members.length - maxMembersToShow;

  return (
    <div className={styles.Members}>
      {members.slice(0, maxMembersToShow).map((member) => (
        <MembersProfileImg
          key={member.id}
          isImg={false}
          nickname={member.nickname}
          profileImageUrl={'#f0f0f0'}
        />
      ))}
      {extraMembersCount > 0 && (
        <MoreMembers plusN={extraMembersCount} />
      )}
    </div>
  );
}

export default Members;
