import { useState } from 'react';
import useNewTodoModal from '../../hooks/modal/useNewTodoModal';
import EditTodoModal from '../modal/EditTodoModal/EditTodoModal';
// import EditColumnModal from '../modal/EditColumnModal/EditColumnModal';
import TodoCardModal from '../modal/TodoCardModal/TodoCardModal';
import useAlertModal from '../../hooks/modal/useAlertModal';
// import useDeleteColumnModal from '../../hooks/modal/useDeleteColumnModal';
import useInviteModal from '../../hooks/modal/useInviteModal';
import useNewColumnModal from '../../hooks/modal/useNewColumnModal';
import useNewDashModal from '../../hooks/modal/useNewDashModal';
import EditColumnManagement from '../modal/EditColumnManagement/EditColumnManagement';

function ModalPageTest() {
  const { NewTodoModal, openTodo } = useNewTodoModal();
  const { AlertModal, openAlert } = useAlertModal();
  const { NewDashModal, openDash } = useNewDashModal();
  const { NewColumnModal, openNewColumn } = useNewColumnModal();
  // const { DeleteColumnModal, openDeleteColumn } = useDeleteColumnModal();
  const { InviteModal, openInvite } = useInviteModal();
  const [todoTest, setTodoTest] = useState(false);
  const [cardTest, setCardTest] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  function handleTodoClick() {
    setTodoTest(!todoTest);
  }

  function handleCardClick() {
    setCardTest(!cardTest);
  }

  function handleColumnClick() {
    setIsEditModalOpen(!isEditModalOpen);
  }

  return (
    <div>
      <button type="button" onClick={handleColumnClick}>컬럼 수정 버튼 | </button>
      {isEditModalOpen
        ? <EditColumnManagement isOpen={isEditModalOpen} setIsOpen={setIsEditModalOpen} />
        : null}

      <button type="button" onClick={openAlert}>Alert 모달 테스트 버튼 | </button>
      <AlertModal modalText="이미 사용 중인 이메일입니다." buttonText="확인" />

      <button type="button" onClick={openTodo}>할 일 생성 버튼 | </button>
      <NewTodoModal />

      <button type="button" onClick={handleTodoClick}>할 일 수정 버튼 | </button>
      {todoTest ? <EditTodoModal isOpen={todoTest} setIsOpen={setTodoTest} /> : null}

      <button type="button" onClick={handleCardClick}>할 일 카드 확인 버튼 | </button>
      {cardTest ? <TodoCardModal isOpen={cardTest} setIsOpen={setCardTest} /> : null}

      <button type="button" onClick={openDash}>+ 버튼 대시보드 추가 | </button>
      <NewDashModal />

      <button type="button" onClick={openNewColumn}>컬럼 추가 버튼 | </button>
      <NewColumnModal />

      <button type="button" onClick={openInvite}>초대 버튼</button>
      <InviteModal />
    </div>
  );
}

export default ModalPageTest;
