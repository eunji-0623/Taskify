import { useContext } from 'react';
import styles from './ProfileEdit.module.scss';
import { UserContext } from '../../../../contexts/UserContext';
import ImageButton from '../ImageButton/ImageButton';
import InputLayout from '../InputLayout/InputLayout';
import Button from '../Button/Button';
import AlertModal from '../../../modal/AlertModal/AlertModal';
import useProfileChange from '../../utils/useProfileChange';

// 마이페이지에서 프로필을 변경해주는 컴포넌트입니다.
// useProfileNameChange에서 기능들을 받아와 구현합니다.
// InputLayout에서 Input 스타일 및 기능을 받아와서 구현합니다.

function ProfileEdit() {
  const {
    nickname,
    isModalOpen,
    isErrorModalOpen,
    closeModal,
    setIsErrorModalOpen,
    closeSuccessModalAndReload,
    handleNicknameChange,
    handleImageChange,
    handleUpdateClick,
  } = useProfileChange(); // 기능 받아오기

  // true로 설정하면서 알맞은(ProfileInput) 스타일로 설정
  const isProfile = true;
  // true면 맨 위 Input의 margin-top 제거
  const topMargin = true;

  // user 정보 받아오기, UserContext가 null일 수 있으므로 이를 안전하게 처리
  const userContext = useContext(UserContext);
  const userInfo = userContext?.userInfo;

  return (
    <div className={styles.profileContainer}>
      {userInfo && (
        <>
          <span className={styles.profileText}>프로필</span>
          <div className={styles.profileSection}>
            <ImageButton onChange={handleImageChange} />
            <div className={styles.inputLayout}>
              <>
                <InputLayout
                  labelText="이메일"
                  id="myPage-email"
                  name="myPage-email"
                  type="email"
                  placeholder="이메일 입력"
                  isProfile={isProfile}
                  topMargin={topMargin}
                  onChange={handleNicknameChange}
                  value={userInfo.email}
                  readOnly
                  disabled={true}
                />
                <InputLayout
                  labelText="닉네임"
                  id="myPage-name"
                  name="myPage-name"
                  type="text"
                  placeholder="닉네임 입력"
                  isProfile={isProfile}
                  topMargin={!topMargin}
                  value={nickname}
                  onChange={handleNicknameChange}
                  readOnly={false}
                  disabled={false}
                />
              </>
            </div>
          </div>
          <Button ButtonText="변경" onClick={handleUpdateClick} />
        </>
      )}
      {isModalOpen && (
        <AlertModal isOpen={isModalOpen} setIsOpen={closeSuccessModalAndReload}>
          <p>닉네임이 변경되었습니다.</p>
          <button type="button" onClick={closeSuccessModalAndReload}>
            확인
          </button>
        </AlertModal>
      )}
      {isErrorModalOpen && (
        <AlertModal isOpen={isErrorModalOpen} setIsOpen={setIsErrorModalOpen}>
          <p>닉네임 변경에 실패했습니다.</p>
          <button type="button" onClick={closeModal}>
            확인
          </button>
        </AlertModal>
      )}
    </div>
  );
}

export default ProfileEdit;
