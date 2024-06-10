import { useCallback, useState } from 'react';
import NewTodoModal from '../../pages/modal/NewTodoModal/NewTodoModal';

/*
  모달의 렌더링 여부가 결정되는 state 생략을 위한 NewTodoModal hook입니다.
  NewTodoModal, openTodo 가 리턴되어 사용할 수 있습니다.
  const { NewTodoModal, openTodo } = useNewTodoModal();
*/

function useNewTodoModal() {
  const [isOpen, setIsOpen] = useState(false);

  // 모달 열기
  const openTodo = useCallback(() => {
    setIsOpen(true);
  }, []);

  return {
    NewTodoModal: isOpen
      ? () => <NewTodoModal isOpen={isOpen} setIsOpen={setIsOpen} />
      : () => null,
    openTodo,
    isOpen,
  };
}

export default useNewTodoModal;
