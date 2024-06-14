import { useCallback, useState } from 'react';
import ModalContainer from '../ModalContainer/ModalContainer';
import { apiInviteDashboards } from '../../../api/apiModule';
import { DeleteBtn } from '../../../components/Btn/Btn';
import styles from './InviteModal.module.scss';

/*
  초대하기 모달입니다.
*/

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  dashboardId: number;
}

function InviteModal({ isOpen, setIsOpen, dashboardId }: ModalProps) {
  const [email, setEmail] = useState('');

  const close = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  // 초대 클릭 시 동작
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const emailObj = { email };
      const response = await apiInviteDashboards(emailObj, { dashboardId });
      if (response) {
        setIsOpen(false);
        window.location.reload();
      }
    } catch (error) {
      throw new Error('error');
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  // 중복 초대 확인 추가

  return (
    <ModalContainer isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className={styles.container}>
        <h1>초대하기</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.content}>
            <label htmlFor="email">이메일</label>
            <input
              className={styles.inputText}
              type="email"
              id="email"
              name="email"
              placeholder="이메일을 입력해 주세요"
              required
              value={email}
              onChange={handleChange}
            />
          </div>

          <div className={styles.buttonBlock}>
            <DeleteBtn BtnText="취소" handleBtn={close} />
            {email.length !== 0 ? (
              <button className={styles.activeButton} type="submit">초대</button>
            ) : (
              <button className={styles.inactiveButton} type="button" disabled>초대</button>
            )}
          </div>
        </form>
      </div>
    </ModalContainer>
  );
}

export default InviteModal;
