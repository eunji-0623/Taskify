import { useParams } from 'react-router-dom';
import { apiDashboardsDetail, apiInvitationList } from '../../api/apiModule';
import SideBar from '../../components/sidebar/sidebar';
import GnbHeader from '../dashboard.{dashboardid}/components/GnbHeader/GnbHeader';
import EmailEdit from './MemberEdit/EmailEdit';
import MemberEdit from './MemberEdit/MemberEdit';
import NameEdit from './NameEdit/NameEdit';
import styles from './index.module.scss';
import { useEffect, useState } from 'react';

/*  대시보드 수정 페이지
    - 전체적인 레이아웃  */

function DashboardEdit() {
  const { id } = useParams();
  const [dashboardId, setDashboardId] = useState(0);
  const [dashboardName, setDashboardName] = useState('');
  const [dashboardColor, setDashboardColor] = useState('');

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

  return (
    <div className={styles.container}>
      <SideBar />
      <div className={styles.main}>
        <GnbHeader />
        <div className={styles.mainContents}>
          <div>돌아가기</div>
          <NameEdit
            name={dashboardName}
            color={dashboardColor}
            dashboardId={dashboardId}
            handleChange={setDashboardName}
          />
          {dashboardId !== 0 && <MemberEdit dashboardId={dashboardId} />}
          {dashboardId !== 0 && <EmailEdit dashboardId={dashboardId} />}
          <button className={styles.removeButton} type="button">
            대시보드 삭제하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default DashboardEdit;
