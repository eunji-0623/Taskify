import { useEffect, useState } from 'react';
import styles from './LoginForm.module.scss';
import useLoginForm from '../utils/useLoginFrom';
import useInputHandlers from '../utils/useInputHandlers';
import AlertModal from '../../../modal/AlertModal/AlertModal';
import { InputType } from '../utils/constants';
import InputEmail from '../Input/InputEmail';
import InputPassword from '../Input/InputPassword';
import Button from '../Button/Button';

// 로그인 화면의 기능을 수행하는 함수를 불러오고 페이지를 리턴해주는 컴포넌트 입니다.
function LoginForm() {
  // 작동 함수 불러오기
  const {
    email,
    password,
    emailError,
    passwordError,
    handleEmailChange,
    handleEmailBlur,
    handlePasswordChange,
    handlePasswordBlur,
  } = useInputHandlers(); // 인풋 에러 관리 함수

  const { loading, isModalOpen, handleSubmit, closeModal, setIsModalOpen } =
    useLoginForm(); // 폼 제출 함수

  // 모든 Input에서 에러가 발생하지 않을 때 버튼 활성화(setIsButtonDisabled)
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    setIsButtonDisabled(
      email.trim() === '' ||
        password.trim() === '' ||
        emailError ||
        passwordError
    );
  }, [email, password, emailError, passwordError]);

  return (
    <>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <div className={styles.emailContainer}>
          <InputEmail
            inputText="이메일"
            id="login-email"
            name="login-email"
            type={InputType.Email}
            placeholder="이메일을 입력해 주세요."
            errorText="이메일 형식으로 작성해 주세요."
            error={emailError}
            value={email}
            onChange={handleEmailChange}
            onBlur={handleEmailBlur}
          />
        </div>
        <div className={styles.passwordContainer}>
          <InputPassword
            inputText="비밀번호"
            id="login-password"
            name="login-password"
            type={InputType.Password}
            placeholder="비밀번호를 입력해 주세요."
            errorText="8자 이상 작성해 주세요."
            error={passwordError}
            value={password}
            onChange={handlePasswordChange}
            onBlur={handlePasswordBlur}
          />
        </div>
        <Button
          pageName="login"
          buttonText={loading ? '로그인 중...' : '로그인'}
          isDisabled={isButtonDisabled || loading}
        />
      </form>
      {isModalOpen && (
        <AlertModal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
          <p>비밀번호가 일치하지 않습니다.</p>
          <button onClick={closeModal}>확인</button>
        </AlertModal>
      )}
    </>
  );
}

export default LoginForm;
