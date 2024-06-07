import { useContext, useState } from 'react';
import styles from './sidebar.module.scss';
import Logo from '/icon/logo_large.svg';
import AddBox from '/icon/add_box.svg';
import SideDashBoard from '../SideDashBoard/SideDashBoard';
import { PagenationBtn } from '../Btn/Btn';
import usePagination from '../../hooks/pagination/usePagination';
import { DashboardContext } from '../../contexts/DashboardContext';
import { Link } from 'react-router-dom';

const ITEMS_PER_PAGE = 15;

interface DashboardApi {
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
  userId: number;
}

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

function SideBar() {
  const [selectedDashboardId, setSelectedDashboardId] = useState<number>();

  const context = useContext(DashboardContext);

  if (!context) {
    throw new Error('반드시 DashboardProvider 안에서 사용해야 합니다.');
  }
  const { setActiveDashboard } = context;

  const { currentItems, handlePrevClick, handleNextClick } =
    usePagination<DashboardApi>({
      fetchData: fetchDashboards,
      itemsPerPage: ITEMS_PER_PAGE,
    });

  const ClickDashboard = (id: number) => {
    setSelectedDashboardId(id);
    setActiveDashboard(id);
  };

  return (
    <div className={styles.SideBar}>
      <Link to='/'>
        <img src={Logo} alt="로고 이미지" className={styles.LogoImg} />
      </Link>
      <div className={styles.SideBarHeader}>
        <span className={styles.Title}>Dash Board</span>
        <img
          src={AddBox}
          alt="대시 보드 추가 버튼 이미지"
          className={styles.AddBox}
          onClick={() => {
            /* 대시보드 생성 모달 로직 */
          }}
        />
      </div>
      <div className={styles.DashboardsList}>
        {currentItems.map((dashboard) => (
          <SideDashBoard
            key={dashboard.id}
            color={dashboard.color}
            title={dashboard.title}
            createdByMe={dashboard.createdByMe}
            isSelected={selectedDashboardId === dashboard.id}
            onClick={() => ClickDashboard(dashboard.id)}
          />
        ))}
      </div>
      <div className={styles.PagenationBtn}>
        <PagenationBtn
          handlePrev={handlePrevClick}
          handleNext={handleNextClick}
        />
      </div>
    </div>
  );
}

export default SideBar;
