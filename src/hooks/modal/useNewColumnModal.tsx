import { useCallback, useState } from 'react';
import NewColumnModal from '../../pages/modal/NewColumnModal/NewColumnModal';

/*
  모달의 렌더링 여부가 결정되는 state 생략을 위한 NewColumnModal hook입니다.
  NewColumnModal, openNewColumn 가 리턴되어 사용할 수 있습니다.
  const { NewColumnModal, openNewColumn } = useAlertModal();
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
