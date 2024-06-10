import { useState } from 'react';
import useAlertModal from '../../hooks/modal/useAlertModal';
import useNewTodoModal from '../../hooks/modal/useNewTodoModal';
import useInviteModal from '../../hooks/modal/useInviteModal';
import useNewColumnModal from '../../hooks/modal/useNewColumnModal';
import useNewDashModal from '../../hooks/modal/useNewDashModal';
import EditColumnManagement from '../modal/EditColumnManagement/EditColumnManagement';
import TodoCardManagement from '../modal/TodoCardManagement/TodoCardManagement';
import { apiLoginRequest } from '../../api/apiModule';

function ModalPageTest() {
  const { NewTodoModal, openTodo } = useNewTodoModal();
  const { AlertModal, openAlert } = useAlertModal();
  const { NewDashModal, openDash } = useNewDashModal();
  const { NewColumnModal, openNewColumn } = useNewColumnModal();
  const { InviteModal, openInvite } = useInviteModal();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [cardTest, setCardTest] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  async function handleLogin(event) {
    event.preventDefault();

    const loginData = {
      email: email,
      password: password
    };

    try {
      await apiLoginRequest(loginData);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('로그인 에러:', error);
    }
  }

  function handleCardClick() {
    setCardTest(!cardTest);
  }

  function handleColumnClick() {
    setIsEditModalOpen(!isEditModalOpen);
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
            ? <EditColumnManagement isOpen={isEditModalOpen} setIsOpen={setIsEditModalOpen} />
            : null}

          <button type="button" onClick={handleCardClick}>할 일 카드 모달 | </button>
          {cardTest
            ? <TodoCardManagement isOpen={cardTest} setIsOpen={setCardTest} />
            : null}

          <button type="button" onClick={openAlert}>Alert 모달 테스트 버튼 | </button>
          <AlertModal modalText="이미 사용 중인 이메일입니다." buttonText="확인" />

          <button type="button" onClick={openTodo}>할 일 생성 버튼 | </button>
          <NewTodoModal />

          <button type="button" onClick={openDash}>+ 버튼 대시보드 추가 | </button>
          <NewDashModal />

          <button type="button" onClick={openNewColumn}>컬럼 추가 버튼 | </button>
          <NewColumnModal />

          <button type="button" onClick={openInvite}>초대 버튼</button>
          <InviteModal />
        </>
      )}
    </div>
  );
}

export default ModalPageTest;
