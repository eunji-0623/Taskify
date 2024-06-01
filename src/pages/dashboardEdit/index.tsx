import styles from './index.module.scss';

/*  대시보드 수정 페이지
    - 전체적인 레이아웃  */

function MyDashboard() {
  return (
    <div className={styles.container}>
      <div>sidemenu</div>
      <div>
        <div>header</div>
        <div>contents</div>
      </div>
    </div>
  );
}

export default MyDashboard;
