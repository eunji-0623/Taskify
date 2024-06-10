import { useState, ChangeEvent } from 'react';

// 인풋을 관리하는 함수 입니다. 에러가 나면 에러를 띄워줍니다.(유효성 검사)
function useInputHandlers() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordCheckError, setPasswordCheckError] = useState(false);

  // 이메일 값 에러 검증
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailError) {
      setEmailError(false);
    }
  };

  // 이메일 형식인지 검증
  const handleEmailBlur = () => {
    setEmailError(!/\S+@\S+\.\S+/.test(email));
  };

  // 이름 값 에러 검증
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (nameError) {
      setNameError(false);
    }
  };

  // 이름 10자 이내인지 검증
  const handleNameBlur = (e: ChangeEvent<HTMLInputElement>) => {
    setNameError(e.target.value.length > 10);
  };

  // 패스워드 값 에러 검증
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (passwordError) {
      setPasswordError(false);
    }
  };

  // 패스워드 8자 넘는지 검증
  const handlePasswordBlur = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordError(e.target.value.length < 8);
  };

  // 패스워드 확인 값 에러 검증
  const handlePasswordCheckChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPasswordCheck(value);
    setPasswordCheckError(password !== value);
  };

  // 패스워드 확인 값 같은지 검증
  const handlePasswordCheckBlur = () => {
    setPasswordCheckError(password !== passwordCheck);
  };

  return {
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
  };
}

export default useInputHandlers;
