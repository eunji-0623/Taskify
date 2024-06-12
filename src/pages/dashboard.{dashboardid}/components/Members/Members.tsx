import { useState, useEffect } from 'react';
import styles from './Members.module.scss';
import { MembersProfileImg } from '../../../../components/UserProfileImg/UserProfileImg';

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

function Members() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMembers = async (): Promise<MemberResponse> => {
    const response = await fetch('/mockData/members.json');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data: MemberResponse = await response.json();
    return data;
  };

  useEffect(() => {
    const getMembers = async () => {
      try {
        const data = await fetchMembers();
        setMembers(data.members);
      } catch (e) {
        setError((e as Error).message);
      } finally {
        setLoading(false);
      }
    };

    getMembers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>멤버 목록을 불러오지 못했습니다.</div>;
  }

  return (
    <div className={styles.Members}>
      {members.map((member) => (
        <MembersProfileImg
          key={member.id}
          isImg={false}
          nickname={member.nickname}
          profileImageUrl={member.profileImageUrl}
        />
      ))}
    </div>
  );
}

export default Members;