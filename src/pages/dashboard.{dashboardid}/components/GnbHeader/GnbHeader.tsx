import styles from './GnbHeader.module.scss';
import { DashboardContext } from '../../../../contexts/DashboardContext';
import { useContext } from 'react';
import UserProfileImg from '../../../../components/UserProfileImg/UserProfileImg';
import CrownImg from '/icon/crown.svg';
import { InviteBtn, SettingBtn } from '../Btn/Btn';
import Members from '../Members/Members';

/*
/dashboard/{dashboardId} 페이지에 해당하는 헤더 컴포넌트입니다.
*/

function GnbHeader() {
  const context = useContext(DashboardContext);

  if (!context) {
    throw new Error('반드시 DashboardProvider 안에서 사용해야 합니다.');
  }
  const { activeTitle, isCreateByMe } = context;

  return (
    <header className={styles.GnbHeader}>
      <div className={styles.TitleContainer}>
        <div className={styles.DashboardTitle}>{activeTitle}</div>
        {isCreateByMe && (
          <img src={CrownImg} alt="관리자 이미지" width={20} height={16} />
        )}
      </div>
      <div className={styles.HandleAndProfile}>
        <div className={styles.BtnContainer}>
          <SettingBtn />
          <InviteBtn />
        </div>
        <div className={styles.MembersAndProfile}>
          <Members />
          <div className={styles.VerticalLine} />
          <UserProfileImg
            isImg={false}
            profileImageUrl="#A3C4A2"
            nickname="Test"
          />
          <div>Test</div>
        </div>
      </div>
    </header>
  );
}

export default GnbHeader;
