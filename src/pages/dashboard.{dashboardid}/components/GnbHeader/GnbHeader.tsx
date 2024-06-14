import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './GnbHeader.module.scss';
import { DashboardContext } from '../../../../contexts/DashboardContext';
import { UserContext } from '../../../../contexts/UserContext';
import UserProfileImg from '../../../../components/UserProfileImg/UserProfileImg';
import CrownImg from '/icon/crown.svg';
import { InviteBtn, SettingBtn } from '../Btn/Btn';
import Members from '../Members/Members';

/*
/dashboard/{dashboardId} 페이지에 해당하는 헤더 컴포넌트입니다.
*/

function ProfileKebab() {
  const navigate = useNavigate();

  const myPageClick = () => {
    navigate('/mypage');
  };

  const logoutClick = () => {
    localStorage.clear(); // 모든 localStorage 항목을 제거
    navigate('/login'); // 페이지 새로고침
  };

  return (
    <div className={styles.ProfileKebab}>
      <button
        className={styles.ProfileKebabBtn}
        type="button"
        onClick={myPageClick}
      >
        마이 페이지
      </button>
      <button
        className={styles.ProfileKebabBtn}
        type="button"
        onClick={logoutClick}
      >
        로그아웃
      </button>
    </div>
  );
}

function GnbHeader() {
  const [ProfileKebabOpen, setProfileKebabOpen] = useState<boolean>(false);
  const dashContext = useContext(DashboardContext);
  const userContext = useContext(UserContext);

  const profileOver = () => {
    setProfileKebabOpen(true); // 상태를 토글
  };
  const ProfileLeave = () => {
    setProfileKebabOpen(false);
  };

  if (!dashContext) {
    throw new Error('반드시 DashboardProvider 안에서 사용해야 합니다.');
  }
  if (!userContext) {
    throw new Error('반드시 UserProvider 안에서 사용해야 합니다.');
  }
  const { activeDashboard, activeTitle, isCreateByMe } = dashContext;
  const { userInfo } = userContext;

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
          <Members dashboardId={activeDashboard} />
          {/* 대시보드 id 가져와야 함. */}
          <div className={styles.VerticalLine} />
          <div onMouseLeave={ProfileLeave} onMouseOver={profileOver} onFocus={profileOver}>
            <div className={styles.Profile}>
              <UserProfileImg
                isImg={false}
                profileImageUrl="#A3C4A2"
                nickname={userInfo?.nickname}
              />
              <div className={styles.nickName}>{userInfo?.nickname}</div>
            </div>
            {ProfileKebabOpen && <ProfileKebab />}
            {' '}
          </div>
        </div>
      </div>
    </header>
  );
}

export default GnbHeader;
