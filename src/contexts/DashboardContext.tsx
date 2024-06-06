import { createContext, useState, ReactNode, FC } from 'react';

/*
사이드 바 대시보드 클릭에 따라
다른 컴포넌트 내용을 변경하기 위한 상태관리 Context 입니다.
*/

interface DashboardContextProps {
  activeDashboard: number | undefined;
  setActiveDashboard: (dashboard: number) => void;
}

export const DashboardContext = createContext<DashboardContextProps | null>(null);

interface DashboardProviderProps {
  children: ReactNode;
}

export const DashboardProvider: FC<DashboardProviderProps> = ({ children }) => {
  const [activeDashboard, setActiveDashboard] = useState<number | undefined>(undefined);

  return (
    <DashboardContext.Provider value={{ activeDashboard, setActiveDashboard }}>
      {children}
    </DashboardContext.Provider>
  );
};
