import styles from './NumChip.module.scss';

interface NumChipProps {
  num: number;
}

// 숫자를 받아 회색 박스에 표시해줍니다.
function NumChip({ num }: NumChipProps) {
  // 두자리까지 박스 벗어나지 않아서 100 이상은 99로 보여지게 처리했습니다.
  const number = num > 99 ? 99 : num;
  return (
    <div className={styles.container}>
      <div className={styles.number}>{number}</div>
    </div>
  );
}

export default NumChip;
