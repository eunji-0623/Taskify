import { useEffect, useRef } from 'react';

export default function ModalContainer({ isOpen, setIsOpen, children }) {
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
    // 테스트 확인 후 style 삭제 하기
    <div style={{ width: '200px' }} ref={modalRef}>
      {children}
    </div>
  );
}
