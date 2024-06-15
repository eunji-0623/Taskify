import { useCallback, useState } from 'react';
import ModalContainer from '../ModalContainer/ModalContainer';
import { apiInviteDashboards } from '../../../api/apiModule';
import { DeleteBtn } from '../../../components/Btn/Btn';
import styles from './InviteModal.module.scss';
import axios from 'axios';

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
  const [error, setError] = useState('');

  // 모달 닫기
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
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorResponse = error.response?.status;
        if (errorResponse === 404) {
          setError('이메일을 다시 한번 확인해주세요');
        } else if (errorResponse === 403) {
          setError('대시보드 초대 권한이 없습니다');
        }
      } else {
        setError('예상치 못한 오류가 발생했습니다');
      }
      throw new Error('error');
    }
    window.location.reload();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    setEmail(event.target.value);
  };

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
          <p className={error !== '' ? styles.errorMessage : styles.message}>
            존재하지 않는 유저 입니다.
          </p>

          <div className={styles.buttonBlock}>
            <DeleteBtn BtnText="취소" handleBtn={close} />
            {email.length !== 0 ? (
              <button className={styles.activeButton} type="submit">
                초대
              </button>
            ) : (
              <button className={styles.inactiveButton} type="button" disabled>
                초대
              </button>
            )}
          </div>
        </form>
      </div>
    </ModalContainer>
  );
}

export default InviteModal;
