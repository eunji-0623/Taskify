import styles from './DashboardList.module.scss';
import usePagination from '../../../../hooks/pagination/usePagination';
import { PagenationBtn } from '../../../../components/Btn/Btn';
import { AddDashboard, Dashboard } from './Dashboard';
import { apiDashboardsList } from '../../../../api/apiModule';

/*  대시보드 목록을 보여주는 컴포넌트입니다.
    - 대시보드 목록을 보여주는 ul 부분과
    - 다음 목록을 불러오기 위한 부분으로 나뉩니다  */

interface DashboardDetail {
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
  userId: number;
}

const ITEMS_PER_PAGE = 5;

const fetchDashboards = async (
  page: number
): Promise<{ items: DashboardDetail[]; totalCount: number }> => {
  const data = await apiDashboardsList({
    navigationMethod: 'pagination',
    page,
    size: ITEMS_PER_PAGE,
  });
  return {
    items: Object.values(data.dashboards),
    totalCount: data.totalCount,
  };
};

function DashboardList() {
  const {
    items,
    currentPage,
    totalPages,
    isFirstPage,
    isLastPage,
    handlePrevClick,
    handleNextClick,
  } = usePagination<DashboardDetail>({
    fetchData: fetchDashboards,
    itemsPerPage: ITEMS_PER_PAGE,
  });

  return (
    <div className={styles.container}>
      <ul className={styles.dashboardList}>
        <li>
          <AddDashboard />
        </li>
        {items.map((dashboard) => (
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
          {totalPages}
          페이지 중{currentPage}
        </p>
        <PagenationBtn
          handlePrev={handlePrevClick}
          handleNext={handleNextClick}
          isFirstPage={isFirstPage}
          isLastPage={isLastPage}
        />
      </div>
    </div>
  );
}

export default DashboardList;
