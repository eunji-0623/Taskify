import {
  createContext, useState, ReactNode, useMemo,
} from 'react';
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

export const DashboardContext = createContext<DashboardContextProps | null>(
  null,
);

interface DashboardProviderProps {
  children: ReactNode;
}

export function DashboardProvider({ children }: DashboardProviderProps) {
  const [activeDashboard, setActiveDashboard] = useState<number | undefined>(
    undefined,
  );
  const [isCreateByMe, setIsCreateByMe] = useState<boolean | undefined>(
    undefined,
  );
  const [activeTitle, setActiveTitle] = useState<string | undefined>(undefined);

  const contextValue = useMemo(() => ({
    activeDashboard,
    setActiveDashboard,
    isCreateByMe,
    setIsCreateByMe,
    activeTitle,
    setActiveTitle,
  }), [activeDashboard, setActiveDashboard, isCreateByMe, setIsCreateByMe, activeTitle, setActiveTitle]);

  return (
    <DashboardContext.Provider value={contextValue}>
      {children}
    </DashboardContext.Provider>
  );
}
