import { useCallback, useState } from 'react';
import EditColumnModal from '../pages/modal/EditColumnModal/EditColumnModal';

/*

*/

function useEditColumnModal() {
  const [isOpen, setIsOpen] = useState(false);

  // 모달 열기
  const openEditColumn = useCallback(() => {
    setIsOpen(true);
  }, []);

  return {
    EditColumnModal: isOpen
      ? () => <EditColumnModal isOpen={isOpen} setIsOpen={setIsOpen} />
      : () => null,
    openEditColumn,
    isOpen,
  };
}

export default useEditColumnModal;
