import styles from './GnbHeader.module.scss';
import { DashboardContext } from '../../../../contexts/DashboardContext';
import { useContext } from 'react';
import UserProfileImg from '../../../../components/UserProfileImg/UserProfileImg';
import CrownImg from '/icon/crown.svg';

function GnbHeader() {
  const context = useContext(DashboardContext);

  if (!context) {
    throw new Error('반드시 DashboardProvider 안에서 사용해야 합니다.');
  }
  const { activeDashboard, isCreatreByMe } = context;

  return (
    <header className={styles.GnbHeader}>
      <div className={styles.TitleContainer}>
        <div className={styles.DashboardTitle}>Dashboard {activeDashboard}</div>
        {isCreatreByMe && <img src={CrownImg} alt="관리자 이미지" width={20} height={16}/>}
      </div>
      <div className={styles.HandleAndProfile}>
        <div className={styles.BtnContainer}>
          <button>관리</button>
          <button>초대하기</button>
        </div>
        <div>members</div>
        <div className={styles.VerticalLine}></div>
        <UserProfileImg
          isImg={false}
          profileImageUrl="#A3C4A2"
          nickname="Test"
        />
        <div>Test</div>
      </div>
    </header>
  );
}

export default GnbHeader;
