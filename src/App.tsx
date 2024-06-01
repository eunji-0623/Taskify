import React from 'react';
import useAlertModal from './hooks/useAlertModal';

function App() {
  // return <>프로젝트 초기설정</>;

  // 테스트 삭제하기
  const { Modal, open, close } = useAlertModal();
  // const test = 1;

  // function testFunction() {
  //   if (test === 1) {
  //     open();
  //   }
  // }

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
