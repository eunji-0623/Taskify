import React, { useCallback, useState } from 'react';
import ModalContainer from '../ModalContainer/ModalContainer';
import { DeleteBtn, ChangeAndSaveBtn } from '../../../components/Btn/Btn';
import styles from './EditColumnModal.module.scss';

/*
  컬럼 관리하는 모달입니다.

  삭제하기 모달과 연결을 위해 직접 사용하는 것이 아닌 EditColumnManagement를 통해 사용합니다.
*/

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  openDeleteModal: () => void;
}

function EditColumnModal({ isOpen, setIsOpen, openDeleteModal }: ModalProps) {
  const [inputValue, setInputValue] = useState('');

  // 취소 버튼을 클릭하면 모달을 닫습니다.
  const close = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  // + 변경 버튼을 클릭하면 컬럼 이름 변경 동작을 추가하기
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  // 삭제하기 버튼을 클릭하면 컬럼 삭제 모달이 열립니다.
  const handleDelete = () => {
    openDeleteModal();
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <ModalContainer isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className={styles.container}>
        <h1>컬럼 관리</h1>
        <form className={styles.content} onSubmit={handleSubmit}>
          <div className={styles.title}>
            <label htmlFor="name">이름</label>
            <input
              className={styles.inputText}
              type="text"
              id="name"
              name="name"
              required
              onChange={handleChange}
            />
          </div>

          <button className={styles.delete} type="button" onClick={handleDelete}>삭제하기</button>

          <div className={styles.buttonBlock}>
            <div className={styles.buttons}>
              <DeleteBtn BtnText="취소" handleBtn={close} />
              {
                inputValue.length !== 0 ? (
                  <ChangeAndSaveBtn
                    BtnText="변경"
                    handleBtn={close}
                  />
                ) : (
                  <button className={styles.inactiveButton} type="button" disabled>변경</button>
                )
              }
            </div>
          </div>
        </form>
      </div>
    </ModalContainer>
  );
}

export default EditColumnModal;
