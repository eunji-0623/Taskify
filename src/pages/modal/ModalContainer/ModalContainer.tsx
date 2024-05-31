import { useEffect, useRef } from 'react';
import styles from './ModalContainer.module.scss';

function ModalContainer({ isOpen, setIsOpen, children }) {
  const modalRef = useRef(null);

  // 모달 영역 밖 클릭 시 닫기
  useEffect(() => {
    const handleModal = (event) => {
      if (isOpen && !modalRef.current?.contains?.(event.target)) {
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
