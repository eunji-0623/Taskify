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
// useInputHandlers 에서 Input의 유효성 검사를 해주고 에러를 발생시켜 줍니다.
// useSignUpForm 에서 폼을 제출할 때 동작하는 기능을 가져옵니다.
// useCheckBox 에서 이용 약관 동의 체크박스의 상태를 관리합니다.
// setIsButtonDisabled 함수로 버튼의 상태(활성화, 비활성화)를 관리합니다.

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
  } = useInputHandlers(); // Input 에러 관리 함수

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

  // 모든 Input에서 에러가 발생하지 않을 때 버튼 활성화 = setIsButtonDisabled(false)
  const setIsButtonDisabled = () => email.trim() === ''
    || name.trim() === ''
    || password.trim() === ''
    || passwordCheck.trim() === ''
    || emailError
    || nameError
    || passwordError
    || passwordCheckError
    || !isCheckboxAgreed;

  // 페이지 리턴
  // constants.ts에서 InputType을 받아와 컴포넌트에 적용시킵니다.
  // InputEmail에서 이메일 입력 Input을 가져옵니다.
  // InputPassword에서 패스워드 입력 Input을 가져옵니다.
  // 닉네임과 패스워드 확인 부분의 Input은 각각 InputEmail과 InputPassword을 활용했습니다.
  // Button에서 회원가입 버튼을 가져옵니다.
  // AlertModal에서 모달 창을 가져옵니다.
  // 발생하는 에러 별로 모달 창을 다르게 적용합니다.
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
            errorText="8자 이상 작성해 주세요."
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
          <button type="button" onClick={closeModal}>
            확인
          </button>
        </AlertModal>
      )}
      {/* 중복된 이메일 모달 */}
      {isErrorModalOpen && (
        <AlertModal isOpen={isErrorModalOpen} setIsOpen={setIsErrorModalOpen}>
          <p>이미 사용 중인 이메일입니다.</p>
          <button type="button" onClick={closeModal}>
            확인
          </button>
        </AlertModal>
      )}
      {/* 그 밖의 에러 모달 */}
      {isWhatModalOpen && (
        <AlertModal isOpen={isWhatModalOpen} setIsOpen={setIsWhatModalOpen}>
          <p>에러가 발생했습니다.</p>
          <button type="button" onClick={closeModal}>
            확인
          </button>
        </AlertModal>
      )}
    </>
  );
}

export default SignUpForm;
