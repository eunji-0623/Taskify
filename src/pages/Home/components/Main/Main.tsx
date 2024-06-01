import { Link } from 'react-router-dom';
import styles from './Main.module.scss';
import titleImage from '/public/img/desktop.png';
import Card from '../Card/Card';
import DashBoard from '/public/img/DashBoardSetting.png';
import Invite from '/public/img/Invite.png';
import Members from '/public/img/Members.png';
import Point1 from '/public/img/Point1.png';
import Point2 from '/public/img/Point2.png';
/*
랜더링 페이지의 Main 부분을 담당합니다.
*/

function Main() {
  return (
    <main className={styles.HomeMain}>
      <div className={styles.MainTitle}>
        <div className={styles.ImageContainer}>
          <img
            src={titleImage}
            alt="타이틀이미지"
            className={styles.titleImage}
          />
        </div>
        <div className={styles.titleTexts}>
          <h1 className={styles.title_h}>
            새로운 일정 관리
          </h1>
          <span className={styles.title_span}>Taskify</span>
        </div>
        <p className={styles.title_p}>서비스의 메인 설명 들어갑니다.</p>
        <Link to="/login">
          <button className={styles.MainLoginBtn} type="button">로그인하기</button>
        </Link>
      </div>
      <section className={styles.MainPoint1}>
        <span className={styles.Point1Text}>Point1</span>
        <h2 className={styles.Point1_h2}>
          일의 우선순위를
          <br />
          관리하세요
        </h2>
        <img
          src={Point1}
          alt="일 우선순위 관리 소개 이미지"
          className={styles.Point1Img}
        />
      </section>
      <section className={styles.MainPoint2}>
        <span className={styles.Point2Text}>Point2</span>
        <h2 className={styles.Point2_h2}>
          해야 할 일을
          <br />
          등록하세요
        </h2>
        <img
          src={Point2}
          alt="일 등록 소개 이미지"
          className={styles.Point2Img}
        />
      </section>
      <section className={styles.MainPlusInfo}>
        <h2 className={styles.PlusInfo_h}>생산성을 높이는 다양한 설정⚡</h2>
        <div className={styles.InfoCards}>
          <Card
            ImgSrc={DashBoard}
            Title="대시보드 설정"
            Text="대시보드 사진과 이름을 변경할 수 있어요."
          />
          <Card
            ImgSrc={Invite}
            Title="초대"
            Text="새로운 팀원을 초대할 수 있어요."
          />
          <Card
            ImgSrc={Members}
            Title="구성원"
            Text="구성원을 초대하고 내보낼 수 있어요."
          />
        </div>
      </section>
    </main>
  );
}

export default Main;
