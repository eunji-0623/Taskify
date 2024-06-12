import { ReactEventHandler } from 'react';
import ColorDot from '../../../../components/chip/ColorCircle/ColorDot';
import styles from './ColumnHeader.module.scss';
import NumChip from '../../../../components/chip/NumChip/NumChip';
import useWindowSize from '../../../../utils/useWindowSize';

interface ColumnHeaderProps {
  name: string;
  totalNum: number;
  scrollToTop: ReactEventHandler;
  handleSettingOnClick: ReactEventHandler;
}

function ColumnHeader({
  name,
  totalNum,
  scrollToTop,
  handleSettingOnClick,
}: ColumnHeaderProps) {
  // 반응형 훅
  const { width } = useWindowSize();

  // 버튼 이벤트 핸들러
  const toTop = (e: React.MouseEvent) => {
    if (width < 1024) return;

    const target = e.target as HTMLElement;
    // ColorDot이나 settingButton을 클릭했을 경우 동작하지 않음.
    if (target.closest(`.${styles.colorDot}`)) {
      return;
    }
    scrollToTop(e);
  };

  // 컴포넌트 출력
  return (
    <div className={styles.container}>
      <ColorDot color="#5534DA" />
      <button type="button" className={styles.toTopButton} onClick={toTop}>
        <div className={styles.columnName}>{name}</div>
        <NumChip num={totalNum} />
      </button>
      <button
        type="button"
        className={styles.settingButton}
        onClick={handleSettingOnClick}
      >
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
