import styles from './SignUpForm.module.scss';
import AlertModal from '../../../modal/AlertModal/AlertModal';
import { InputType } from '../utils/constants';
import InputEmail from '../Input/InputEmail';
import InputPassword from '../Input/InputPassword';
import Checkbox from '../CheckBox/CheckBox';
import Button from '../Button/Button';
import useInputHandlers from '../utils/useInputHandlers';
import useSignUpForm from '../utils/useSignUpForm';
import useCheckBox from '../utils/useCheckBox';

// 회원가입 화면의 기능을 수행하는 함수를 불러오고 페이지를 리턴해주는 컴포넌트 입니다.
function SignUpForm() {
  const {
    email,
    name,
    password,
    passwordCheck,
    emailError,
    nameError,
    passwordError,
    passwordCheckError,
    handleEmailChange,
    handleEmailBlur,
    handleNameChange,
    handleNameBlur,
    handlePasswordChange,
    handlePasswordBlur,
    handlePasswordCheckChange,
    handlePasswordCheckBlur,
  } = useInputHandlers(); // 인풋 에러 관리 함수

  const {
    loading,
    isModalOpen,
    isErrorModalOpen,
    isWhatModalOpen,
    handleSubmit,
    closeModal,
    setIsModalOpen,
    setIsErrorModalOpen,
    setIsWhatModalOpen,
  } = useSignUpForm(); // 회원가입 폼 제출 함수

  const { isCheckboxAgreed, handleCheckboxChange } = useCheckBox(); // 체크박스 상태 관리 함수

  // 모든 Input에서 에러가 발생하지 않을 때 버튼 활성화(setIsButtonDisabled)
  const setIsButtonDisabled = () =>
    email.trim() === '' ||
    name.trim() === '' ||
    password.trim() === '' ||
    passwordCheck.trim() === '' ||
    emailError ||
    nameError ||
    passwordError ||
    passwordCheckError ||
    !isCheckboxAgreed;

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
            errorText={'이메일 형식으로 작성해 주세요.'}
            error={emailError}
            value={email}
            onChange={handleEmailChange}
            onBlur={handleEmailBlur}
          />
        </div>
        <div className={styles.nameContainer}>
          <InputEmail
            inputText="닉네임"
            id="signUp-name"
            name="signUp-name"
            type={InputType.Text}
            placeholder="닉네임을 입력해 주세요."
            errorText="열 자 이하로 작성해 주세요."
            value={name}
            onChange={handleNameChange}
            onBlur={handleNameBlur}
            error={nameError}
          />
        </div>
        <div className={styles.passwordContainer}>
          <InputPassword
            inputText="비밀번호"
            id="login-password"
            name="login-password"
            type={InputType.Password}
            placeholder="비밀번호를 입력해 주세요."
            errorText={'8자 이상 작성해 주세요.'}
            error={passwordError}
            value={password}
            onChange={handlePasswordChange}
            onBlur={handlePasswordBlur}
          />
        </div>
        <div className={styles.passwordContainer}>
          <InputPassword
            inputText="비밀번호 확인"
            id="signUp-password-check"
            name="signUp-password-check"
            type={InputType.Password}
            placeholder="비밀번호를 한번 더 입력해 주세요"
            errorText="비밀번호가 일치하지 않습니다."
            value={passwordCheck}
            onChange={handlePasswordCheckChange}
            onBlur={handlePasswordCheckBlur}
            error={passwordCheckError}
          />
        </div>
        <Checkbox
          Label="이용약관에 동의합니다."
          onChange={handleCheckboxChange}
        />
        <Button
          pageName="signUp"
          buttonText={loading ? '회원가입 중...' : '회원가입'}
          isDisabled={setIsButtonDisabled() || loading}
        />
      </form>
      {/* 회원가입 성공 모달 */}
      {isModalOpen && (
        <AlertModal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
          <p>가입이 완료되었습니다!</p>
          <button onClick={closeModal}>확인</button>
        </AlertModal>
      )}
      {/* 중복된 이메일 모달 */}
      {isErrorModalOpen && (
        <AlertModal isOpen={isErrorModalOpen} setIsOpen={setIsErrorModalOpen}>
          <p>이미 사용 중인 이메일입니다.</p>
          <button onClick={closeModal}>확인</button>
        </AlertModal>
      )}
      {/* 그 밖의 에러 모달 */}
      {isWhatModalOpen && (
        <AlertModal isOpen={isWhatModalOpen} setIsOpen={setIsWhatModalOpen}>
          <p>에러가 발생했습니다.</p>
          <button onClick={closeModal}>확인</button>
        </AlertModal>
      )}
    </>
  );
}

export default SignUpForm;
