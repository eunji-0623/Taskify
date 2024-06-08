import { useCallback } from 'react';
import ModalContainer from '../ModalContainer/ModalContainer';
import { DeleteBtn, ChangeAndSaveBtn } from '../../../components/Btn/Btn';
import styles from './InviteModal.module.scss';

/*
  이메일로 사용자를 초대하는 모달입니다.
*/

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

function InviteModal({ isOpen, setIsOpen }: ModalProps) {
  // 모달 닫기
  const close = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  // 초대 버튼 클릭 시 동작
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <ModalContainer isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className={styles.container}>
        <h1>초대하기</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.content}>
            <label htmlFor="email">이메일</label>
            <input className={styles.inputText} type="text" id="email" name="email" placeholder="이름을 입력해 주세요" required />
          </div>

          <div className={styles.buttonBlock}>
            <DeleteBtn BtnText="삭제" handleBtn={close} />
            <ChangeAndSaveBtn BtnText="초대" handleBtn={close} />
          </div>
        </form>
      </div>
    </ModalContainer>
  );
}

export default InviteModal;
