import { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './sidebar.module.scss';
import Logo from '/icon/logo_large.svg';
import AddBox from '/icon/add_box.svg';
import LogoMobile from '/icon/logo_small.svg';
import SideDashBoard from '../SideDashBoard/SideDashBoard';
import { PagenationBtn } from '../Btn/Btn';
import usePagination from '../../hooks/pagination/usePagination';
import { DashboardContext } from '../../contexts/DashboardContext';
import useNewDashModal from '../../hooks/modal/useNewDashModal';
import { apiDashboardsList } from '../../api/apiModule';

/*
사이드 바 컴포넌트 입니다.
우선 기본적으로 대시보드를 15개씩 보이도록 하고,
스크롤은 따로 적용되도록 하였습니다.
대시보드 클릭 시, /dashboard/{dashboardId}로 이동합니다.
*/

interface DashboardDetail {
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
  userId: number;
}

const ITEMS_PER_PAGE = 10;

const fetchDashboards = async (
  page: number,
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

function SideBar() {
  const { NewDashModal, openDash } = useNewDashModal();
  const context = useContext(DashboardContext);

  if (!context) {
    throw new Error('반드시 DashboardProvider 안에서 사용해야 합니다.');
  }
  const { setActiveDashboard, setIsCreateByMe, setActiveTitle } = context;
  const navigate = useNavigate();

  const { items, currentPage, totalPages ,handlePrevClick, handleNextClick } = usePagination<DashboardDetail>({
    fetchData: fetchDashboards,
    itemsPerPage: ITEMS_PER_PAGE,
  });

  const ClickDashboard = (id: number, createdByMe: boolean, title: string) => {
    setActiveDashboard(id);
    setIsCreateByMe(createdByMe);
    setActiveTitle(title);
    navigate(`/dashboard/${id}`);
  };

  return (
    <div className={styles.SideBar}>
      <Link to="/">
        <img src={Logo} alt="로고 이미지" className={styles.LogoImg} />
        <img
          src={LogoMobile}
          alt="로고 이미지"
          className={styles.LogoImgMobile}
        />
      </Link>
      <div className={styles.SideBarHeader}>
        <span className={styles.Title}>Dash Board</span>
        <button
          type="button"
          className={styles.AddBoxButton}
          onClick={openDash}
        >
          <img
            src={AddBox}
            alt="대시 보드 추가 버튼 이미지"
            className={styles.AddBox}
          />
        </button>
        <NewDashModal />
      </div>
      <div className={styles.DashboardsList}>
        {items.map((dashboard) => (
          <SideDashBoard
            key={dashboard.id}
            color={dashboard.color}
            title={dashboard.title}
            createdByMe={dashboard.createdByMe}
            selectedId={dashboard.id}
            onClick={() => ClickDashboard(
              dashboard.id,
              dashboard.createdByMe,
              dashboard.title,
            )}
          />
        ))}
      </div>
      <div className={styles.PagenationBtn}>
        <PagenationBtn
          isFirstPage={currentPage === 1}
          isLastPage={currentPage === totalPages}
          handlePrev={handlePrevClick}
          handleNext={handleNextClick}
        />
      </div>
    </div>
  );
}

export default SideBar;
