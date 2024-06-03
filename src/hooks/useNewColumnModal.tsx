import { useCallback, useState } from 'react';
import NewColumnModal from '../pages/modal/NewColumnModal/NewColumnModal';

/*

*/

function useNewColumnModal() {
  const [isOpen, setIsOpen] = useState(false);

  // 모달 열기
  const openNewColumn = useCallback(() => {
    setIsOpen(true);
  }, []);

  return {
    NewColumnModal: isOpen
      ? () => <NewColumnModal isOpen={isOpen} setIsOpen={setIsOpen} />
      : () => null,
    openNewColumn,
    isOpen,
  };
}

export default useNewColumnModal;
