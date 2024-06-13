import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiDashboardsDetail } from '../../api/apiModule';
import SideBar from '../../components/sidebar/sidebar';
import GnbHeader from '../dashboard.{dashboardid}/components/GnbHeader/GnbHeader';
import EmailEdit from './MemberEdit/EmailEdit';
import MemberEdit from './MemberEdit/MemberEdit';
import NameEdit from './NameEdit/NameEdit';
import styles from './index.module.scss';
import { DeleteDashBoardBtn } from '../../components/Btn/Btn';
import DeleteDashboardModal from '../modal/DeleteDashboardModal/DeleteDashboardModal';

/*  대시보드 수정 페이지
    - 전체적인 레이아웃  */

function DashboardEdit() {
  const { id } = useParams();
  const [dashboardId, setDashboardId] = useState(0);
  const [dashboardName, setDashboardName] = useState('');
  const [dashboardColor, setDashboardColor] = useState('');
  const [deleteDashboard, setDeleteDashboard] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboards = async () => {
      if (id) {
        const data = await apiDashboardsDetail({ dashboardId: +id });
        setDashboardId(+id);
        setDashboardName(data.title);
        setDashboardColor(data.color);
      }
    };

    fetchDashboards();
  }, [id]);

  const handleBackButton = () => {
    navigate(`/dashboard/${id}`);
  };

  const handleDeleteDashboard = () => {
    setDeleteDashboard(!deleteDashboard);
  };

  return (
    <div className={styles.container}>
      <SideBar />
      <div className={styles.main}>
        <GnbHeader />
        <div className={styles.mainContents}>
          <button
            className={styles.backButton}
            type="button"
            onClick={handleBackButton}
          >
            <img src="/icon/arrow_forward.svg" alt="화살표" />
            <p>돌아가기</p>
          </button>
          <NameEdit
            name={dashboardName}
            color={dashboardColor}
            dashboardId={dashboardId}
            handleChange={setDashboardName}
          />
          {dashboardId !== 0 && <MemberEdit dashboardId={dashboardId} />}
          {dashboardId !== 0 && <EmailEdit dashboardId={dashboardId} />}
          <div className={styles.deleteButton}>
            <DeleteDashBoardBtn handleBtn={handleDeleteDashboard} />
            {deleteDashboard ? (
              <DeleteDashboardModal
                isOpen={deleteDashboard}
                setIsOpen={setDeleteDashboard}
                dashboardId={dashboardId}
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardEdit;
