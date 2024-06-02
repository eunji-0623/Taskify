import styles from './SignUp.module.scss';
import Logo from '../components/Logo/Logo';
import InputEmail from '../components/Input/InputEmail';
import InputName from '../components/Input/InputName';
import InputPassword from '../components/Input/InputPassword';
import InputPasswordCheck from '../components/Input/InputPasswordCheck';
import Checkbox from '../components/CheckBox/CheckBox';
import LInkText from '../components/LinkText/LinkText';

function SignUp() {
  return (
    <div className={styles.Layout}>
      <Logo Text="첫 방문을 환영합니다!" />
      <form>
        <div className={styles.emailContainer}>
          <InputEmail
            inputText="이메일"
            id="signUp-email"
            name="signUp-email"
            type="email"
            placeholder="이메일을 입력해 주세요"
          />
        </div>
        <InputName />
        <div className={styles.passwordContainer}>
          <InputPassword
            inputText="비밀번호"
            id="login-password"
            name="login-password"
            type="password"
            placeholder="8자 이상 입력해 주세요"
          />
        </div>
        <InputPasswordCheck />
        <Checkbox Label="이용약관에 동의합니다." />
        <button className={styles.signUpButton}>가입하기</button>
      </form>
      <LInkText Text="이미 가입하셨나요?" Link="/login" LinkText="로그인하기" />
    </div>
  );
}

export default SignUp;
