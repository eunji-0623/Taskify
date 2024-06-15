import { useMediaQuery } from 'react-responsive';
import { useContext, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './sidebar.module.scss';
import Logo from '/icon/logo_large.svg';
import AddBox from '/icon/add_box.svg';
import LogoMobile from '/icon/logo_small.svg';
import SideDashBoard from '../SideDashBoard/SideDashBoard';
import { PagenationBtn } from '../Btn/Btn';
import { DashboardContext } from '../../contexts/DashboardContext';
import useNewDashModal from '../../hooks/modal/useNewDashModal';
import { apiDashboardsList } from '../../api/apiModule';

interface DashboardDetail {
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
  userId: number;
}

const ITEMS_PER_PAGE = 15;
const ITEMS_PER_PAGE_MOBILE = 100;

const fetchDashboards = async (
  page: number,
  itemsPerPage: number
): Promise<{ items: DashboardDetail[]; totalCount: number }> => {
  const data = await apiDashboardsList({
    navigationMethod: 'pagination',
    page,
    size: itemsPerPage,
  });
  return {
    items: Object.values(data.dashboards),
    totalCount: data.totalCount,
  };
};

function SideBar() {
  const { NewDashModal, openDash } = useNewDashModal();
  const navigate = useNavigate();
  const context = useContext(DashboardContext);

  if (!context) {
    throw new Error('반드시 DashboardProvider 안에서 사용해야 합니다.');
  }

  const { setActiveDashboard, setIsCreateByMe, setActiveTitle } = context;

  // 상태 관리
  const [dashboardItems, setDashboardItems] = useState<DashboardDetail[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // 화면 크기에 따라 한 페이지당 보여줄 대시보드 수를 결정
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const itemsPerPage = isMobile ? ITEMS_PER_PAGE_MOBILE : ITEMS_PER_PAGE;

  // 데이터 로드 및 페이지 설정
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { items: dashboards, totalCount } = await fetchDashboards(
          1,
          itemsPerPage
        );
        setDashboardItems(dashboards);
        setTotalPages(Math.ceil(totalCount / itemsPerPage));
      } catch (error) {
        setIsError(true);
        setErrorMessage('Error fetching dashboards');
      }
    };

    fetchData();
  }, [itemsPerPage]);

  const fetchPageData = async (page: number) => {
    try {
      const { items: dashboards } = await fetchDashboards(page, itemsPerPage);
      setDashboardItems(dashboards);
    } catch (error) {
      setIsError(true);
      setErrorMessage(`Error fetching dashboards for page: ${page}`);
    }
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      fetchPageData(prevPage);
      setCurrentPage(prevPage);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      fetchPageData(nextPage);
      setCurrentPage(nextPage);
    }
  };

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
        <span className={styles.Title}>Dash Boards</span>
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
      {isError && <div className={styles.ErrorMessage}>{errorMessage}</div>}
      <div className={styles.DashboardsList}>
        {dashboardItems.map((dashboard) => (
          <SideDashBoard
            key={dashboard.id}
            color={dashboard.color}
            title={dashboard.title}
            createdByMe={dashboard.createdByMe}
            selectedId={dashboard.id}
            onClick={() =>
              ClickDashboard(
                dashboard.id,
                dashboard.createdByMe,
                dashboard.title
              )
            }
          />
        ))}
      </div>
      {!isMobile && (
        <div className={styles.PaginationBtn}>
          <PagenationBtn
            isFirstPage={currentPage === 1}
            isLastPage={currentPage === totalPages}
            handlePrev={handlePrevClick}
            handleNext={handleNextClick}
          />
        </div>
      )}
    </div>
  );
}

export default SideBar;
