import ColorDot from '../../../../components/chip/ColorCircle/ColorDot';
import styles from './ColumnHeader.module.scss';
import NumChip from '../../../../components/chip/NumChip/NumChip';
import useWindowSize from '../../../../utils/useWindowSize';

interface ColumnHeaderProps {
  name: string;
  totalNum: number;
  onClick: () => void;
}
function ColumnHeader({ name, totalNum, onClick }: ColumnHeaderProps) {
  const { width } = useWindowSize();

  const handleClick = (event: React.MouseEvent) => {
    if (width < 1024) return;

    const target = event.target as HTMLElement;
    // ColorDot이나 settingButton을 클릭했을 경우 onClick을 무시합니다.
    if (
      target.closest(`.${styles.settingButton}`) ||
      target.closest(`.${styles.colorDot}`)
    ) {
      return;
    }
    onClick();
  };

  return (
    <div className={styles.container} onClick={handleClick}>
      <ColorDot color="#5534DA" />
      <div className={styles.columnName}>{name}</div>
      <NumChip num={totalNum} />
      <button type="button" className={styles.settingButton}>
        <img
          src="/icon/setting.svg"
          alt="setting_button"
          className={styles.buttonImg}
        />
      </button>
    </div>
  );
}

export default ColumnHeader;
