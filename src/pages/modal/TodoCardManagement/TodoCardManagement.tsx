import { useState } from 'react';
import TodoCardModal from '../TodoCardModal/TodoCardModal';
import EditTodoModal from '../EditTodoModal/EditTodoModal';

/*
  할 일 카드 정보를 보여주는 모달과 할 일 수정 모달을 관리합니다.

  TodoCardModal에서 수정하기 버튼을 클릭하면
  TodoCardModal은 닫고 EditTodoModal이 열립니다.
*/

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

function TodoCardManagement({ isOpen, setIsOpen }: ModalProps) {
  const [todoModalOpen, setTodoModalOpen] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const openEditModal = () => {
    setEditModalOpen(true);
    setTodoModalOpen(false);
  };

  const openTodoModal = () => {
    setEditModalOpen(false);
    setTodoModalOpen(true);
  };

  return (
    <>
      {todoModalOpen && (
        <TodoCardModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          openEditModal={openEditModal}
        />
      )}
      {editModalOpen && (
        <EditTodoModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          openTodoModal={openTodoModal}
        />
      )}
    </>
  );
}

export default TodoCardManagement;
