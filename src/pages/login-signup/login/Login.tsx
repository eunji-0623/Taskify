import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.scss';
import Logo from '../components/Logo/Logo';
import LoginForm from '../components/LoginForm/LoginForm';
import LInkText from '../components/LinkText/LinkText';

function Login() {
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
      <Logo Text="오늘도 만나서 반가워요!" />
      <LoginForm />
      <LInkText
        Text="회원이 아니신가요?"
        LinkRouter="/signup"
        TextForLink="회원가입하기"
      />
    </div>
  );
}

export default Login;
