import { useCallback, useState } from 'react';
import DeleteColumnModal from '../pages/modal/DeleteColumnModal/DeleteColumnModal';

/*
  모달의 렌더링 여부가 결정되는 state 생략을 위한 DeleteColumnModal hook입니다.
  DeleteColumnModal, openDeleteColumn 가 리턴되어 사용할 수 있습니다.
  const { DeleteColumnModal, openDeleteColumn } = useDeleteColumnModal();
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
