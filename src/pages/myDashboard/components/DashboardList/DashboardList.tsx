import styles from './DashboardList.module.scss';
import usePagination from '../../../../hooks/usePagination';
import { PagenationBtn } from '../../../../components/Btn/Btn';
import { AddDashboard, Dashboard } from './Dashboard';

/*  대시보드 목록을 보여주는 컴포넌트입니다.
    - 대시보드 목록을 보여주는 ul 부분과
    - 다음 목록을 불러오기 위한 부분으로 나뉩니다  */

interface DashboardApi {
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
  userId: number;
}

const ITEMS_PER_PAGE = 5;

const fetchDashboards = async (page: number) => {
  // mockData 사용. 추후 변경 필요
  const response = await fetch(
    `/mockData/dashboards.json?page=${page}&limit=${ITEMS_PER_PAGE}`
  );
  const data = await response.json();
  return {
    items: data.dashboards,
    totalCount: data.totalCount,
  };
};

function DashboardList() {
  const {
    currentItems,
    currentPage,
    totalPages,
    handlePrevClick,
    handleNextClick,
  } = usePagination<DashboardApi>({
    fetchData: fetchDashboards,
    itemsPerPage: ITEMS_PER_PAGE,
  });

  return (
    <div className={styles.container}>
      <ul className={styles.dashboardList}>
        <li>
          <AddDashboard />
        </li>
        {currentItems.map((dashboard) => (
          <li key={dashboard.id}>
            <Dashboard
              color={dashboard.color}
              title={dashboard.title}
              isOwner={dashboard.createdByMe}
            />
          </li>
        ))}
      </ul>
      <div className={styles.pagination}>
        <p>
          {totalPages} 페이지 중 {currentPage}
        </p>
        <PagenationBtn
          handlePrev={handlePrevClick}
          handleNext={handleNextClick}
        />
      </div>
    </div>
  );
}

export default DashboardList;
