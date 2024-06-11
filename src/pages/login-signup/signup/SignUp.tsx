import styles from './SignUp.module.scss';
import Logo from '../components/Logo/Logo';
import SignUpForm from '../components/SignUpForm/SignUpForm';
import LInkText from '../components/LinkText/LinkText';

function SignUp() {
  return (
    <div className={styles.Layout}>
      <Logo Text="첫 방문을 환영합니다!" />
      <SignUpForm />
      <LInkText
        Text="이미 가입하셨나요?"
        LinkRouter="/login"
        TextForLink="로그인하기"
      />
    </div>
  );
}

export default SignUp;
