import ColorCircle from '../ColorCircle/ColorCircle';
import styles from './ProgressState.module.scss';

interface ProgressStateProps {
  content: string;
}

// 진행상황을 보여주는 chip입니다.
// text를 prop으로 받습니다. 색상은 고정입니다.
function ProgressState({ content }: ProgressStateProps) {
  return (
    <div className={styles.container}>
      <ColorCircle color="#5534DA" diameter={6} />
      <span className={styles.content}>{content}</span>
    </div>
  );
}

export default ProgressState;
