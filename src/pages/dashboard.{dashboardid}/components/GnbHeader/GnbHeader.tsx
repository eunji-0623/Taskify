import styles from './GnbHeader.module.scss';
import { DashboardContext } from '../../../../contexts/DashboardContext';
import { useContext } from 'react';

function GnbHeader() {
  const context = useContext(DashboardContext);

  if (!context) {
    throw new Error('반드시 DashboardProvider 안에서 사용해야 합니다.');
  }
  const { activeDashboard } = context;

  return (
    <header className={styles.GnbHeader}>
      <div>
        Dashboard {activeDashboard}
      </div>
      <div className={styles.HandleAndProfile}>
        <div className={styles.BtnContainer}>
          <button>
            관리
          </button>
          <button>
            초대하기
          </button>
        </div>
        <div>
          members
        </div>
        <div className={styles.VerticalLine}></div>
        <div>프로필이미지</div>
        <div>이름</div>
      </div>
    </header>
  )
}

export default GnbHeader;