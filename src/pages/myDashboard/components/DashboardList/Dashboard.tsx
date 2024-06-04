import styles from './Dashboard.module.scss';
import ColorDot from '../../../../components/chip/ColorCircle/ColorDot';

interface DashboardButtonProps {
  color: string;
  title: string;
  isOwner: boolean;
}

// 각각의 대시보드로 이동하기 위한 버튼 컴포넌트
function Dashboard({ color, title, isOwner }: DashboardButtonProps) {
  return (
    <button type="button" className={styles.dashboard}>
      <div className={styles.description}>
        <ColorDot color={color} />
        <div>{title}</div>
        {isOwner ? (
          <img src="/icon/crown.svg" alt="내가 만든 대시보드" />
        ) : null}
      </div>
      <img src="/icon/arrow_right.svg" alt="오른쪽 화살표" />
    </button>
  );
}

export default Dashboard;
