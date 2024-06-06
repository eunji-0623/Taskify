import styles from './SideDashBoard.module.scss';
import ColorDot from '../chip/ColorCircle/ColorDot';
import CrownImg from '/icon/crown.svg';

interface SideDashBoardProps {
  color: string;
  title: string;
  createdByMe: boolean;
  isSelected: boolean;
  onClick: () => void;
}

function SideDashBoard({ color, title, createdByMe, isSelected, onClick }: SideDashBoardProps) {
  return (
    <div
      className={`${styles.SideDashBoard} ${isSelected ? styles.selected : ''}`}
      onClick={onClick}
    >
      <ColorDot color={color} />
      <span className={styles.Title}>{title}</span>
      {createdByMe && <img src={CrownImg} alt="관리자 표시 이미지" className={styles.CrownImg} />}
    </div>
  );
}

export default SideDashBoard;
