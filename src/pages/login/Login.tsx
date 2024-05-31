import { useState } from 'react';
import styles from './Login.module.scss';
import LogoImage from '../../../public/icon/logo_main.svg';
import EyeOn from '../../../public/icon/eye_on.svg';
import EyeOff from '../../../public/icon/eye_off.svg';

function Login() {
  const [toggleVisible, setToggleVisible] = useState(false);

  // 눈 모양 아이콘 토글 함수
  const toggleButton = () => {
    const toggleIcon = document.getElementById(
      'login-password'
    ) as HTMLInputElement;
    setToggleVisible(!toggleVisible);
    toggleIcon.type = toggleVisible ? 'password' : 'text';
  };

  return (
    <div className={styles.Layout}>
      <img src={LogoImage} className={styles.LogoImage} alt="LogoImage" />
      <span className={styles.HelloText}>오늘도 만나서 반가워요!</span>
      <form>
        <div className={styles.emailContainer}>
          <label className={styles.inputText}>이메일</label>
          <input
            className={styles.emailInputSection}
            id="login-email"
            name="login-email"
            type="email"
            placeholder="이메일을 입력해주세요"
          />
        </div>
        <div className={styles.passwordContainer}>
          <label className={styles.inputText}>비밀번호</label>
          <div className={styles.passwordInputContainer}>
            <input
              className={styles.passwordInputSection}
              id="login-password"
              name="login-password"
              type="password"
              placeholder="비밀번호를 입력해 주세요"
            />
            <img
              src={toggleVisible ? EyeOff : EyeOn}
              className={styles.toggleButton}
              onClick={toggleButton}
            />
          </div>
        </div>
        <button className={styles.loginButton}>로그인</button>
      </form>
      <div className={styles.signUpTextContainer}>
        <span className={styles.signUpText}>회원이 아니신가요?</span>
        <a href="/signUp" className={styles.signUpLink}>
          회원가입하기
        </a>
      </div>
    </div>
  );
}

export default Login;
