import { useState, ChangeEvent } from 'react';
import { SignUpFormInputs } from './useSignUpForm';

// 인풋을 관리하는 함수 입니다.
// 유효성 검사를 통해 에러가 발생하는 곳에 Focus Out할 시 useState를 사용해 에러를 띄워줍니다.
// LoginForm, SignUpForm 컴포넌트에서 사용됩니다.

function useInputHandlers(
  values: SignUpFormInputs,
  setValues: React.Dispatch<React.SetStateAction<SignUpFormInputs>>
) {
  const [emailError, setEmailError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordCheckError, setPasswordCheckError] = useState(false);
  // 이메일 값 에러 검증
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValues((prevValues) => ({ ...prevValues, email: value }));
    if (emailError) setEmailError(false);
  };

  // 이메일 형식인지 검증
  const handleEmailBlur = () => {
    setEmailError(!/\S+@\S+\.\S+/.test(values.email));
  };

  // 이름 값 에러 검증
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValues((prevValues) => ({ ...prevValues, nickname: value }));
    if (nameError) setNameError(false);
  };

  // 이름 10자 이내인지 검증
  const handleNameBlur = () => {
    setNameError(values.nickname.length > 10);
  };

  // 패스워드 값 에러 검증
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValues((prevValues) => ({ ...prevValues, password: value }));
    if (passwordError) setPasswordError(false);
  };
  // 패스워드 8자 넘는지 검증
  const handlePasswordBlur = () => {
    setPasswordError(values.password.length < 8);
  };

  // 패스워드 확인 값 에러 검증
  const handlePasswordCheckChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValues((prevValues) => ({ ...prevValues, passwordCheck: value }));
    setPasswordCheckError(values.password !== value);
  };

  // 패스워드 확인 값 같은지 검증

  const handlePasswordCheckBlur = () => {
    setPasswordCheckError(values.password !== values.passwordCheck);
  };

  // 사용할 값 리턴
  return {
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
  };
}

export default useInputHandlers;
