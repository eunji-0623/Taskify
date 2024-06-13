import { useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.scss';
import ColorDot from '../../../../components/chip/ColorCircle/ColorDot';
import useNewDashModal from '../../../../hooks/modal/useNewDashModal';

interface DashboardButtonProps {
  id: number;
  color: string;
  title: string;
  isOwner: boolean;
}

/*  새로운 대시보드 추가를 위한 버튼  */
export function AddDashboard() {
  const { NewDashModal, openDash } = useNewDashModal();

  return (
    <>
      <button type="button" className={styles.addDashboard} onClick={openDash}>
        <p>새로운 대시보드</p>
        <img src="/icon/add_task.svg" alt="추가" />
      </button>
      <NewDashModal />
    </>
  );
}

/*  각각의 대시보드로 이동하기 위한 버튼  */
export function Dashboard({
  id, color, title, isOwner,
}: DashboardButtonProps) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/dashboard/${id}`);
  };

  return (
    <button type="button" className={styles.dashboard} onClick={handleClick}>
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
