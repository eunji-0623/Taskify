import { useState } from 'react';
import useNewTodoModal from '../../hooks/useNewTodoModal';
import EditTodoModal from '../modal/EditTodoModal/EditTodoModal';
import EditColumnModal from '../modal/EditColumnModal/EditColumnModal';
import TodoCardModal from '../modal/TodoCardModal/TodoCardModal';

/*  모달 테스트 - 반드시 삭제하고 push  */

function ModalPageTest() {
  const { NewTodoModal, openTodo } = useNewTodoModal();
  const [todoTest, setTodoTest] = useState(false);
  const [cardTest, setCardTest] = useState(false);
  const [columnTest, setColumnTest] = useState(false);

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
    </div>
  );
}

export default ModalPageTest;
