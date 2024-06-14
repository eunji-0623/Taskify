import { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './Btn.module.scss';
import SettingImg from '/icon/setting.svg';
import AddBoxImg from '/icon/add_box.svg';
import { DashboardContext } from '../../../../contexts/DashboardContext';
import InviteModal from '../../../modal/InviteModal/InviteModal';

export function SettingBtn() {
  const context = useContext(DashboardContext);

  if (!context) {
    throw new Error('반드시 DashboardProvider 안에서 사용해야 합니다.');
  }
  const { activeDashboard } = context;

  return (
    <Link
      to={`/dashboard/${activeDashboard}/edit`}
      className={styles.SettingBtnLink}
    >
      <button type="button" className={styles.SettingBtn}>
        <img
          src={SettingImg}
          alt="톱니바퀴 모양 이미지"
          className={styles.SettingImg}
        />
        <span className={styles.Text}>관리</span>
      </button>
    </Link>
  );
}

export function InviteBtn() {
  const [testState, setTestState] = useState(false);

  const { id: dashboardId } = useParams<{ id: string }>();

  function InviteClick() {
    setTestState(!testState);
  }

  return (
    <>
      <button type="button" className={styles.InviteBtn} onClick={InviteClick}>
        <img
          src={AddBoxImg}
          alt="초대하기 버튼 이미지"
          className={styles.AddBoxImg}
        />
        <span className={styles.Text}>초대하기</span>
      </button>
      {testState ? (
        <InviteModal
          isOpen={testState}
          setIsOpen={setTestState}
          dashboardId={Number(dashboardId)}
        />
      ) : null }
    </>
  );
}
