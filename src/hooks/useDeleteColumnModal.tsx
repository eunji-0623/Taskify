import { useCallback, useState } from 'react';
import DeleteColumnModal from '../pages/modal/DeleteColumnModal/DeleteColumnModal';

/*

*/

function useDeleteColumnModal() {
  const [isOpen, setIsOpen] = useState(false);

  // 모달 열기
  const openDeleteColumn = useCallback(() => {
    setIsOpen(true);
  }, []);

  return {
    DeleteColumnModal: isOpen
      ? () => <DeleteColumnModal isOpen={isOpen} setIsOpen={setIsOpen} />
      : () => null,
    openDeleteColumn,
    isOpen,
  };
}

export default useDeleteColumnModal;
