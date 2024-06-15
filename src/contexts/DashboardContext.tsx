import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
} from 'react';
import { useLocation } from 'react-router-dom';

/*
  사이드 바 대시보드 클릭에 따라 데이터를 옮기고 Navigate 하기 위한 상태관리 Context 입니다.
  현재 열고 있는 대시보드의 id와 유저가 그 대시보드의 관리자인지 여부를 저장합니다.
*/

interface DashboardContextProps {
  activeDashboard: number | undefined;
  setActiveDashboard: (dashboard: number) => void;
  isCreateByMe: boolean | undefined;
  setIsCreateByMe: (dashboard: boolean) => void;
  activeTitle: string | undefined;
  setActiveTitle: (dashboard: string) => void;
}

export const DashboardContext = createContext<DashboardContextProps | null>(null);

interface DashboardProviderProps {
  children: ReactNode;
}

export function DashboardProvider({ children }: DashboardProviderProps) {
  const [activeDashboard, setActiveDashboard] = useState<number | undefined>(() => {
    const savedDashboardId = localStorage.getItem('activeDashboard');
    return savedDashboardId ? Number(savedDashboardId) : undefined;
  });
  const [isCreateByMe, setIsCreateByMe] = useState<boolean | undefined>(() => {
    const savedIsCreatedByMe = localStorage.getItem('isCreatedByMe');
    return savedIsCreatedByMe ? savedIsCreatedByMe === 'true' : undefined;
  });
  const [activeTitle, setActiveTitle] = useState<string | undefined>(() => {
    const savedTitle = localStorage.getItem('activeTitle');
    return savedTitle || undefined;
  });

  const location = useLocation();

  useEffect(() => {
    if (activeDashboard !== undefined) {
      localStorage.setItem('activeDashboard', activeDashboard.toString());
    }
  }, [activeDashboard]);

  useEffect(() => {
    if (isCreateByMe !== undefined) {
      localStorage.setItem('isCreatedByMe', isCreateByMe.toString());
    }
  }, [isCreateByMe]);

  useEffect(() => {
    if (activeTitle !== undefined) {
      localStorage.setItem('activeTitle', activeTitle);
    }
  }, [activeTitle]);

  useEffect(() => {
    if (location.pathname === '/mydashboard' || location.pathname === '/mypage') {
      setActiveDashboard(undefined);
      setActiveTitle(undefined);
      setIsCreateByMe(undefined);
      localStorage.removeItem('activeDashboard');
      localStorage.removeItem('isCreatedByMe');
      localStorage.removeItem('activeTitle');
    }
  }, [location.pathname]);

  const contextValue = useMemo(() => ({
    activeDashboard,
    setActiveDashboard,
    isCreateByMe,
    setIsCreateByMe,
    activeTitle,
    setActiveTitle,
  }), [activeDashboard, isCreateByMe, activeTitle]);

  return (
    <DashboardContext.Provider value={contextValue}>
      {children}
    </DashboardContext.Provider>
  );
}
