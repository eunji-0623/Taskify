import styles from './Login.module.scss';
import Logo from '../components/Logo/Logo';
import InputEmail from '../components/Input/InputEmail';
import InputPassword from '../components/Input/InputPassword';
import LInkText from '../components/LinkText/LinkText';

function Login() {
  return (
    <div className={styles.Layout}>
      <Logo Text="오늘도 만나서 반가워요!" />
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
        <div className={styles.passwordContainer}>
          <InputPassword
            inputText="비밀번호"
            id="login-password"
            name="login-password"
            type="password"
            placeholder="비밀번호를 입력해 주세요"
          />
        </div>
        <button className={styles.loginButton}>로그인</button>
      </form>
      <LInkText
        Text="회원이 아니신가요?"
        Link="/signup"
        LinkText="회원가입하기"
      />
    </div>
  );
}

export default Login;
