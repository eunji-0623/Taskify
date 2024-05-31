import React from 'react';
import useModal from './utils/useAlertModal';

function App() {
  const { Modal, open, close } = useModal();

  // return <>프로젝트 초기설정</>;

  // 모달 테스트 나중에 삭제하기
  return (
    <div>
      <button onClick={open}>모달 테스트 버튼</button>
      <Modal>
        <p>비밀번호가 일치하지 않습니다.</p>
        <button onClick={close}>확인</button>
      </Modal>
    </div>
  );
}

export default App;
