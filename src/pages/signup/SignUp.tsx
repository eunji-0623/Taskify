import { useState } from 'react';
import styles from './SignUp.module.scss';
import LogoImage from '../../../public/icon/logo_main.svg';
import EyeOn from '../../../public/icon/eye_on.svg';
import EyeOff from '../../../public/icon/eye_off.svg';

function SignUp() {
  const [toggleVisible, setToggleVisible] = useState(false);

  // 눈 모양 아이콘 토글 함수
  const toggleButton = () => {
    const toggleIcon = document.getElementById(
      'signUp-password'
    ) as HTMLInputElement;
    setToggleVisible(!toggleVisible);
    toggleIcon.type = toggleVisible ? 'password' : 'text';
  };

  return (
    <div className={styles.Layout}>
      <img src={LogoImage} className={styles.LogoImage} alt="LogoImage" />
      <span className={styles.HelloText}>첫 방문을 환영합니다!</span>
      <form>
        <div className={styles.emailContainer}>
          <label className={styles.inputText}>이메일</label>
          <input
            className={styles.emailInputSection}
            id="signUp-email"
            name="signUp-email"
            type="email"
            placeholder="이메일을 입력해주세요"
          />
        </div>
        <div className={styles.nameContainer}>
          <label className={styles.inputText}>닉네임</label>
          <input
            className={styles.emailInputSection}
            id="signUp-name"
            name="signUp-name"
            type="text"
            placeholder="닉네임을 입력해주세요"
          />
        </div>
        <div className={styles.passwordContainer}>
          <label className={styles.inputText}>비밀번호</label>
          <div className={styles.passwordInputContainer}>
            <input
              className={styles.passwordInputSection}
              id="signUp-password"
              name="signUp-password"
              type="password"
              placeholder="8자 이상 입력해 주세요"
            />
            <img
              src={toggleVisible ? EyeOff : EyeOn}
              className={styles.toggleButton}
              onClick={toggleButton}
            />
          </div>
        </div>
        <div className={styles.passwordContainer}>
          <label className={styles.inputText}>비밀번호 확인</label>
          <div className={styles.passwordInputContainer}>
            <input
              className={styles.passwordInputSection}
              id="signUp-password-check"
              name="signUp-password-check"
              type="password"
              placeholder="비밀번호를 한번 더 입력해 주세요"
            />
            <img
              src={toggleVisible ? EyeOff : EyeOn}
              className={styles.toggleButton}
              onClick={toggleButton}
            />
          </div>
        </div>
        <span>이용약관에 동의합니다.</span>
        <button className={styles.signUpButton}>가입하기</button>
      </form>
      <div className={styles.loginTextContainer}>
        <span className={styles.loginText}>이미 가입하셨나요?</span>
        <a href="/login" className={styles.loginLink}>
          로그인하기
        </a>
      </div>
    </div>
  );
}

export default SignUp;
