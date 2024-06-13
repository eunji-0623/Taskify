import { SetStateAction, useEffect, useState } from 'react';
import { apiChangePassword } from '../../../api/apiModule';

// 패스워드 변경 기능을 구현하는 함수입니다.
// 세 인풋이 모두 올바르게 들어가야 버튼이 활성화됩니다.
// 새 비밀번호 값이 일치하지 않을 경우 에러 메세지를 보여줍니다.

function usePasswordChange() {
  // 패스워드 각 상태 관리
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  // 모달 상태관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  // 모달 닫는 함수
  const closeModal = () => {
    setIsModalOpen(false);
    setIsErrorModalOpen(false);
  };

  // 변경 성공 시 모달을 닫으면 자동으로 페이지 새로고침
  const closeSuccessModalAndReload = () => {
    setIsModalOpen(false);
    window.location.reload();
  };

  // 패스워드가 일치하는지 여부 검사
  const checkPasswordMatch = (
    newPassword: string,
    confirmNewPassword: string
  ) => {
    const match = newPassword === confirmNewPassword;
    setIsPasswordMatch(match);
  };

  // 각 패스워드 변경 함수
  // 현재 패스워드
  const handlePasswordChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setPassword(e.target.value);
  };

  // 새로운 패스워드
  const handleNewPasswordChange = (e: { target: { value: string } }) => {
    const value = e.target.value;
    setNewPassword(value);
    checkPasswordMatch(value, confirmNewPassword);
  };

  // 새로운 패스워드 확인
  const handleConfirmNewPasswordChange = (e: { target: { value: string } }) => {
    const value = e.target.value;
    setConfirmNewPassword(value);
    checkPasswordMatch(newPassword, value);
  };

  // 각 Input의 값이 변경될 때마다 상태 업데이트
  useEffect(() => {
    checkAllFieldsFilled();
  }, [password, newPassword, confirmNewPassword, isPasswordMatch]);

  // 패스워드 상태에 따라 버튼 활성화
  const checkAllFieldsFilled = () => {
    const allFieldsFilled =
      password.length > 0 &&
      newPassword.length > 0 &&
      confirmNewPassword.length > 0;
    setIsButtonEnabled(allFieldsFilled && isPasswordMatch);
  };

  // 최종 변경 버튼 함수
  const handleChangePasswordClick = async () => {
    if (!isPasswordMatch) {
      setIsErrorModalOpen(true);
      return;
    }

    try {
      await apiChangePassword({ password, newPassword }); // 비밀번호 변경 api 호출
      setIsModalOpen(true); // 성공 시 성공 모달
    } catch (error) {
      setIsErrorModalOpen(true); // 실패 시 실패 모달(어차피 버튼 활성화 안되서 의미 없음?)
    }
  };

  return {
    password,
    newPassword,
    confirmNewPassword,
    isModalOpen,
    isErrorModalOpen,
    isPasswordMatch,
    isButtonEnabled,
    closeModal,
    closeSuccessModalAndReload,
    setIsErrorModalOpen,
    handlePasswordChange,
    handleNewPasswordChange,
    handleConfirmNewPasswordChange,
    handleChangePasswordClick,
    checkPasswordMatch,
  };
}

export default usePasswordChange;
