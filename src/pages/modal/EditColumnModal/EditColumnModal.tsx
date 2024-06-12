import React, { useCallback, useEffect, useState } from 'react';
import ModalContainer from '../ModalContainer/ModalContainer';
import { apiGetColumnList, apiUpdateColumn } from '../../../api/apiModule';
import { DeleteBtn } from '../../../components/Btn/Btn';
import styles from './EditColumnModal.module.scss';

/*
  컬럼 관리하는 모달입니다.

  삭제하기 모달과 연결을 위해 직접 사용하는 것이 아닌 EditColumnManagement를 통해 사용합니다.
*/

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  openDeleteModal: () => void;
  columnTitle: string;
  columnId: number;
  dashboardId: number;
}

interface ColumnOverAll {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
}

function EditColumnModal({
  isOpen,
  setIsOpen,
  openDeleteModal,
  columnTitle,
  columnId,
  dashboardId,
}: ModalProps) {
  const [inputValue, setInputValue] = useState<string>(columnTitle);
  const [columnList, setColumnList] = useState<Array<string>>([]);
  const [check, setCheck] = useState(false);

  // 컬럼 목록 조회
  const apiColumnData = useCallback(async () => {
    try {
      const response = await apiGetColumnList(dashboardId);
      if (response.result === 'SUCCESS') {
        const titles = Array.isArray(response.data)
          ? response.data.map((column: ColumnOverAll) => column.title) : [];
        setColumnList(titles);
      } else {
        throw new Error('error');
      }
    } catch (error) {
      throw new Error('error');
    }
  }, [dashboardId]);

  useEffect(() => {
    if (dashboardId) {
      apiColumnData();
    }
  }, [dashboardId, apiColumnData]);

  // 컬럼 이름 변경 동작
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newColumn = {
      title: inputValue,
    };

    try {
      await apiUpdateColumn(newColumn, columnId);
      setIsOpen(false);
    } catch (error) {
      throw new Error('error');
    }
  };

  // 삭제하기 버튼을 클릭하면 컬럼 삭제 모달이 열립니다.
  const handleDelete = () => {
    openDeleteModal();
  };

  // 컬럼 이름 입력
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  // 컬럼 중복 title 확인
  const columnCheck = useCallback(() => {
    if (columnList.length > 0) {
      setCheck(columnList.includes(inputValue));
    }
  }, [inputValue, columnList]);

  useEffect(() => {
    columnCheck();
  }, [inputValue, columnCheck, columnList]);

  // 모달 닫기
  const close = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

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
              value={inputValue}
              onChange={handleChange}
            />
            {check && <p className={styles.errorMessage}>중복된 컬럼 이름입니다.</p>}
          </div>

          <button className={styles.delete} type="button" onClick={handleDelete}>삭제하기</button>

          <div className={styles.buttonBlock}>
            <div className={styles.buttons}>
              <DeleteBtn BtnText="취소" handleBtn={close} />
              { inputValue && !check
                ? <button className={styles.activeButton} type="submit">변경</button>
                : <button className={styles.inactiveButton} type="submit" disabled>변경</button>}
            </div>
          </div>
        </form>
      </div>
    </ModalContainer>
  );
}

export default EditColumnModal;
