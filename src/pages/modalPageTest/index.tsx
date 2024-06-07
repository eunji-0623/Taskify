import { useState } from 'react';
import useNewTodoModal from '../../hooks/useNewTodoModal';
import EditTodoModal from '../modal/EditTodoModal/EditTodoModal';
import EditColumnModal from '../modal/EditColumnModal/EditColumnModal';
import TodoCardModal from '../modal/TodoCardModal/TodoCardModal';
import useAlertModal from '../../hooks/useAlertModal';
import useDeleteColumnModal from '../../hooks/useDeleteColumnModal';
import useInviteModal from '../../hooks/useInviteModal';
import useNewColumnModal from '../../hooks/useNewColumnModal';
import useNewDashModal from '../../hooks/useNewDashModal';

function ModalPageTest() {
  const { NewTodoModal, openTodo } = useNewTodoModal();
  const [todoTest, setTodoTest] = useState(false);
  const [cardTest, setCardTest] = useState(false);
  const [columnTest, setColumnTest] = useState(false);
  const { AlertModal, openAlert, closeAlert } = useAlertModal();
  const { NewDashModal, openDash } = useNewDashModal();
  const { NewColumnModal, openNewColumn } = useNewColumnModal();
  const { DeleteColumnModal, openDeleteColumn } = useDeleteColumnModal();
  const { InviteModal, openInvite } = useInviteModal();

  function handleTodoClick() {
    setTodoTest(!todoTest);
  }

  function handleCardClick() {
    setCardTest(!cardTest);
  }

  function handleColumnClick() {
    setColumnTest(!columnTest);
  }

  return (
    <div>
      <button type="button" onClick={openTodo}>할 일 생성 버튼</button>
      <NewTodoModal />

      <button type="button" onClick={handleTodoClick}>할 일 수정 버튼</button>
      {todoTest ? <EditTodoModal isOpen={todoTest} setIsOpen={setTodoTest} /> : null}

      <button type="button" onClick={handleColumnClick}>컬럼 수정 버튼</button>
      {columnTest ? <EditColumnModal isOpen={columnTest} setIsOpen={setColumnTest} /> : null}

      <button type="button" onClick={handleCardClick}>할 일 카드 확인 버튼</button>
      {cardTest ? <TodoCardModal isOpen={cardTest} setIsOpen={setCardTest} /> : null}

      <button type="button" onClick={openAlert}>Alert 모달 테스트 버튼</button>
      <AlertModal>
        <p>이미 사용 중인 이메일입니다.</p>
        <button type="button" onClick={closeAlert}>확인</button>
      </AlertModal>

      <button type="button" onClick={openDash}>+ 버튼 대시보드 추가</button>
      <NewDashModal />

      <button type="button" onClick={openNewColumn}>컬럼 추가 버튼</button>
      <NewColumnModal />

      <button type="button" onClick={openDeleteColumn}>컬럼 삭제 버튼</button>
      <DeleteColumnModal />

      <button type="button" onClick={openInvite}>초대 버튼</button>
      <InviteModal />
    </div>
  );
}

export default ModalPageTest;