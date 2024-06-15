import { ReactNode } from 'react';
import useWindowSize from '../../../../utils/useWindowSize';
import styles from './ColumnContainer.module.scss';

interface ContainerProps {
  children: ReactNode;
}

// 반응형으로 컬럼을 배치하기 위한 컴포넌트
function ColumnContainer({ children }: ContainerProps) {
  const { width } = useWindowSize();

  let containerComponent;

  if (width >= 1024) {
    // Desktop 크기 (1024px 이상)
    containerComponent = <div className={styles.desktop}>{children}</div>;
  } else if (width >= 768) {
    // Tablet 크기 (768px 이상)
    containerComponent = <div className={styles.tablet}>{children}</div>;
  } else {
    // Mobile 크기 (768px 미만)
    containerComponent = <div className={styles.mobile}>{children}</div>;
  }

  return containerComponent;
}

export default ColumnContainer;
