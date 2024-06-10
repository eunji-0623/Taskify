import { useState, useEffect } from 'react';
import styles from './Members.module.scss';
import { MembersProfileImg } from '../../../../components/UserProfileImg/UserProfileImg';

interface member {
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
  members: member[];
  totalCount: number;
}

function Members() {
  // mock데이터로 테스트
  const [members, setMembers] = useState<member[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const fetchMembers = async (): Promise<MemberResponse> => {
    const response = await fetch(`/mockData/members.json`); // JSON 파일의 경로를 설정합니다.
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
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    getMembers();
  }, []);

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
