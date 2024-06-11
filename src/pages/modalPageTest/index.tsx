import { useState } from 'react';
import useAlertModal from '../../hooks/modal/useAlertModal';
import useNewDashModal from '../../hooks/modal/useNewDashModal';
import EditColumnManagement from '../modal/EditColumnManagement/EditColumnManagement';
import TodoCardManagement from '../modal/TodoCardManagement/TodoCardManagement';
import { apiLoginRequest } from '../../api/apiModule';

import NewColumnModal from '../modal/NewColumnModal/NewColumnModal';
import NewTodoModal from '../modal/NewTodoModal/NewTodoModal';
import InviteModal from '../modal/InviteModal/InviteModal';

function ModalPageTest() {
  const { AlertModal, openAlert } = useAlertModal();
  const { NewDashModal, openDash } = useNewDashModal();
  // const { NewColumnModal, openNewColumn } = useNewColumnModal();
  // const { InviteModal, openInvite } = useInviteModal();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [cardTest, setCardTest] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [newColumn, setNewColumn] = useState(false);
  const [newTodo, setNewTodo] = useState(false);
  const [invite, setInvite] = useState(false);

  async function handleLogin(event) {
    event.preventDefault();

    const loginData = {
      email: email,
      password: password,
    };

    try {
      await apiLoginRequest(loginData);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('로그인 에러:', error);
    }
  }

  // 카드 클릭
  function handleCardClick() {
    setCardTest(!cardTest);
  }

  // 컬럼 수정
  function handleColumnClick() {
    setIsEditModalOpen(!isEditModalOpen);
  }

  // 새로운 컬럼
  function NewColumnClick() {
    setNewColumn(!newColumn);
  }

  // 할 일 생성
  function NewTodoClick() {
    setNewTodo(!newTodo);
  }

  // 초대
  function InviteClick() {
    setInvite(!invite);
  }

  return (
    <div>
      {!isLoggedIn && (
        <form onSubmit={handleLogin}>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">로그인</button>
        </form>
      )}

      {isLoggedIn && (
        <>
          <button type="button" onClick={handleColumnClick}>컬럼 수정 버튼 | </button>
          {isEditModalOpen
            ? <EditColumnManagement isOpen={isEditModalOpen} setIsOpen={setIsEditModalOpen} dashboardId={8922} columnId={30078} columnTitle="Done" />
            : null}

          <button type="button" onClick={handleCardClick}>할 일 카드 모달 | </button>
          {cardTest
            ? (
              <TodoCardManagement
                isOpen={cardTest}
                setIsOpen={setCardTest}
                cardId={7733}
                userId={3635}
                columnId={30082}
              />
            ) : null}

          <button type="button" onClick={openAlert}>Alert 모달 테스트 버튼 | </button>
          <AlertModal modalText="이미 사용 중인 이메일입니다." buttonText="확인" />

          <button type="button" onClick={NewTodoClick}>할 일 생성 버튼 | </button>
          {newTodo ? (
            <NewTodoModal
              isOpen={newTodo}
              setIsOpen={setNewTodo}
              userId={3635}
              dashboardId={8922}
              columnId={30082}
            />
          ) : null}

          <button type="button" onClick={InviteClick}>초대 버튼 | </button>
          {invite ? (
            <InviteModal
              isOpen={invite}
              setIsOpen={setInvite}
              dashboardId={8922}
            />
          ) : null }

          <button type="button" onClick={openDash}>+ 버튼 대시보드 추가 | </button>
          <NewDashModal />

          <button type="button" onClick={NewColumnClick}>컬럼 생성 + | </button>
          {newColumn
            ? <NewColumnModal isOpen={newColumn} setIsOpen={setNewColumn} dashboardId={8929} />
            : null}
        </>
      )}
    </div>
  );
}

export default ModalPageTest;
