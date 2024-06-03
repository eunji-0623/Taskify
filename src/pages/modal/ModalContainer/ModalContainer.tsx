import { useEffect, useRef, ReactNode } from 'react';
import styles from './ModalContainer.module.scss';

/*
  모달 영역 밖 클릭 시 닫는 Modal을 감싸는 컴포넌트입니다.
  isOpen, setIsOpen, children을 props로 받습니다.
*/

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children: ReactNode;
}

function ModalContainer({ isOpen, setIsOpen, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // 모달 영역 밖 클릭 시 닫기
  useEffect(() => {
    const handleModal = (event: MouseEvent) => {
      if (isOpen && !modalRef.current?.contains?.(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleModal);

    return () => {
      document.removeEventListener('mousedown', handleModal);
    };
  }, [isOpen, setIsOpen, modalRef]);

  return (
    <div className={styles.container}>
      <div className={styles.content} ref={modalRef}>
        {children}
      </div>
    </div>
  );
}

export default ModalContainer;
