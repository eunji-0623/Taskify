import styles from './DashboardList.module.scss';

/*  대시보드 목록을 보여주는 컴포넌트입니다.
    - 대시보드 목록을 보여주는 ul 부분과  
    - 다음 목록을 불러오기 위한 부분으로 나뉩니다  */

function DashboardList() {
  return (
    <div className={styles.container}>
      <ul className={styles.dashboardList}>
        <li>새로운 대시보드</li>
        <li>코드잇</li>
        <li>3분기 계획</li>
        <li>회의록</li>
        <li>중요 문서함</li>
        <li>테스트 123</li>
      </ul>
      <div className={styles.pagination}>
        <p>1페이지 중 1</p>
        <div>페이지 이동 버튼</div>
      </div>
    </div>
  );
}

export default DashboardList;
