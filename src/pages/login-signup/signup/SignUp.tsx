import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SignUp.module.scss';
import Logo from '../components/Logo/Logo';
import SignUpForm from '../components/SignUpForm/SignUpForm';
import LInkText from '../components/LinkText/LinkText';

function SignUp() {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('Token');

    if (accessToken) {
      // AccessToken이 존재하면 '/mydashboard' 페이지로 이동
      navigate('/mydashboard');
    }
  }, [navigate]); // navigate를 의존성 배열에 추가

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
