import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { apiInquireMyInfo } from '../api/apiModule';

/*
현재 로그인된 유저의 정보를 가져오는 Context입니다.
로그인 되지 않은 유저가
/mydashboard /dashboard/{id} 등에 접속하려할 경우 로그인 페이지로
네비게이트 됩니다.
context에 저장된 userInfo를 통해 사용자 정보를 확인할 수 있습니다.
*/

export interface UserInfo {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

interface UserContextProps {
  userInfo: UserInfo | null;
  setUserInfo: (info: UserInfo) => void;
}

interface UserProviderProps {
  children: ReactNode;
}

// UserContext 생성
export const UserContext = createContext<UserContextProps | null>(null);

// UserProvider 컴포넌트
export function UserProvider({ children }: UserProviderProps) {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const Info = await apiInquireMyInfo();
        setUserInfo(Info);
      } catch (error) {
        setUserInfo(null);
        navigate('/login');
      }
    };

    fetchUserInfo();
  }, [navigate]);

  const value = useMemo(
    () => ({ userInfo, setUserInfo }),
    [userInfo],
  );

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}
