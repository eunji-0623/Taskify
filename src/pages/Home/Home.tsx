import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.scss';
import Footer from './components/Footer/Footer';
import HomeHeader from './components/Header/Header';
import Main from './components/Main/Main';

/*
초기 랜딩 페이지 최상단 입니다.
*/

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('Token');

    if (accessToken) {
      // AccessToken이 존재하면 '/mydashboard' 페이지로 이동
      navigate('/mydashboard');
    }
  }, [navigate]); // navigate를 의존성 배열에 추가

  return (
    <div className={styles.HomeBody}>
      <HomeHeader />
      <Main />
      <Footer />
    </div>
  );
}

export default Home;
