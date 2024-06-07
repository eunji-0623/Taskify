import React, { useState, useEffect, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
// 머지 후 api 주소 수정
import { apiLoginRequest } from '../../utils/util';
import styles from './LoginForm.module.scss';
import InputEmail from '../Input/InputEmail';
import InputPassword from '../Input/InputPassword';
import Button from '../Button/Button';

function LoginForm() {
  // 값 관리
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [, /* error */ setError] = useState<string | null>(null); // 값 사용 X
  const [, /* user */ setUser] = useState<string | null>(null); // 값 사용 X
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const navigate = useNavigate();

  // Input 값이 변경될 때마다 버튼 상태 업데이트(활성화, 비활성화)
  useEffect(() => {
    setIsButtonDisabled(email.trim() === '' || password.trim() === '');
  }, [email, password]);

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

  // 로그인 폼 작동 함수
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // API 요청
    try {
      const response = await apiLoginRequest({ email, password });
      setUser(response.user);
      // api 확인 용 console.log('환영합니다,', response.user, '님!');
      navigate('/mydashboard');
    } catch (error) {
      setError('로그인에 실패했습니다. 다시 시도해주세요.');
      // 모달 창 추가
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.formContainer} onSubmit={handleLogin}>
      <div className={styles.emailContainer}>
        <InputEmail
          inputText="이메일"
          id="login-email"
          name="login-email"
          type="email"
          placeholder="이메일을 입력해 주세요."
          errorText="이메일 형식으로 작성해 주세요."
          value={email}
          onChange={handleEmailChange}
          onBlur={handleEmailBlur}
          error={emailError}
        />
      </div>
      <div className={styles.passwordContainer}>
        <InputPassword
          inputText="비밀번호"
          id="login-password"
          name="login-password"
          type="password"
          placeholder="비밀번호를 입력해 주세요."
          errorText="8자 이상 작성해 주세요."
          value={password}
          onChange={handlePasswordChange}
          onBlur={handlePasswordBlur}
          error={passwordError}
        />
      </div>
      <Button
        pageName="login"
        buttonText={loading ? '로그인 중...' : '로그인'}
        isDisabled={isButtonDisabled || loading}
      />
    </form>
  );
}

export default LoginForm;
