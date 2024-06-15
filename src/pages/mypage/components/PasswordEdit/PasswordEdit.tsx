import styles from './PasswordEdit.module.scss';
import InputLayout from '../InputLayout/InputLayout';
import Button from '../Button/Button';
import AlertModal from '../../../modal/AlertModal/AlertModal';
import usePasswordChange from '../../utils/usePasswordChange';

// 마이페이지에서 비밀번호를 변경해주는 컴포넌트입니다.
// usePasswordChange에서 기능들을 받아와 구현합니다.
// InputLayout에서 Input 스타일 및 기능을 받아와서 구현합니다.
// 현재 비밀번호, 새 비밀번호, 새 비밀번호 확인 세 가지가 모두 충족되어야 변경이 가능합니다.

function PasswordEdit() {
  const {
    password,
    newPassword,
    confirmNewPassword,
    isModalOpen,
    isErrorModalOpen,
    isPasswordMatch,
    isButtonEnabled,
    closeModal,
    setIsErrorModalOpen,
    closeSuccessModalAndReload,
    handlePasswordChange,
    handleNewPasswordChange,
    handleConfirmNewPasswordChange,
    handleChangePasswordClick,
    checkPasswordMatch,
  } = usePasswordChange(); // 기능 받아오기

  // true면 ProfileInput 스타일, false면 passwordInput 스타일로 설정
  const isProfile = true;
  // true면 맨 위 Input의 margin-top 제거
  const topMargin = true;

  return (
    <div className={styles.passwordContainer}>
      <span className={styles.passwordText}>비밀번호 변경</span>
      <InputLayout
        labelText="현재 비밀번호"
        id="myPage-password-check"
        name="myPage-password-check"
        type="password"
        placeholder="현재 비밀번호 입력"
        isProfile={!isProfile}
        topMargin={topMargin}
        value={password}
        onChange={handlePasswordChange}
        readOnly={false}
        disabled={false}
        onBlur={() => {}}
        error=""
      />
      <InputLayout
        labelText="새 비밀번호"
        id="myPage-new-password"
        name="myPage-new-password"
        type="password"
        placeholder="새 비밀번호 입력"
        isProfile={!isProfile}
        topMargin={!topMargin}
        value={newPassword}
        onChange={handleNewPasswordChange}
        readOnly={false}
        disabled={false}
        onBlur={() => {}}
        error=""
      />
      <InputLayout
        labelText="새 비밀번호 확인"
        id="myPage-new-password-check"
        name="myPage-new-password-check"
        type="password"
        placeholder="새 비밀번호 입력"
        isProfile={!isProfile}
        topMargin={!topMargin}
        value={confirmNewPassword}
        onChange={handleConfirmNewPasswordChange}
        onBlur={() => checkPasswordMatch(newPassword, confirmNewPassword)}
        error={
          !isPasswordMatch && confirmNewPassword.length > 0
            ? '비밀번호가 일치하지 않습니다.'
            : ''
        }
        readOnly={false}
        disabled={false}
      />
      <Button
        ButtonText="변경"
        onClick={handleChangePasswordClick}
        disabled={!isButtonEnabled}
      />
      {isModalOpen && (
        <AlertModal isOpen={isModalOpen} setIsOpen={closeSuccessModalAndReload}>
          <p>비밀번호가 변경되었습니다.</p>
          <button type="button" onClick={closeSuccessModalAndReload}>
            확인
          </button>
        </AlertModal>
      )}
      {isErrorModalOpen && (
        <AlertModal isOpen={isErrorModalOpen} setIsOpen={setIsErrorModalOpen}>
          <p>현재 비밀번호가 다릅니다.</p>
          <button type="button" onClick={closeModal}>
            확인
          </button>
        </AlertModal>
      )}
    </div>
  );
}

export default PasswordEdit;
