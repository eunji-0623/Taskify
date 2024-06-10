import ColorDot from '../../../../components/chip/ColorCircle/ColorDot';
import styles from './ColumnHeader.module.scss';
import NumChip from '../../../../components/chip/NumChip/NumChip';

interface ColumnHeaderProps {
  name: string;
}
function ColumnHeader({ name }: ColumnHeaderProps) {
  return (
    <div className={styles.container}>
      <ColorDot color="var(--violet-violet_5534DA, #5534DA)" />
      <div className={styles.columnName}>{name}</div>
      <NumChip num={1} />
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
