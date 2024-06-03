import styles from './Home.module.scss';
import Footer from './components/Footer/Footer';
import HomeHeader from './components/Header/Header';
import Main from './components/Main/Main';

/*
초기 랜더링 페이지 최상단 입니다.
*/

function Home() {
  return (
    <div className={styles.HomeBody}>
      <HomeHeader />
      <Main />
      <Footer />
    </div>
  );
}

export default Home;
