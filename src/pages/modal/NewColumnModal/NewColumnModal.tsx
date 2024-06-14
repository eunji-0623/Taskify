import { useCallback, useEffect, useState } from 'react';
import ModalContainer from '../ModalContainer/ModalContainer';
import { apiCreateColumn, apiGetColumnList } from '../../../api/apiModule';
import { DeleteBtn } from '../../../components/Btn/Btn';
import styles from './NewColumnModal.module.scss';

/*
  새로운 컬럼을 생성하는 모달입니다.
*/

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  dashboardId: number;
  afterSubmit: () => void;
}

interface ColumnOverAll {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
}

function NewColumnModal({
  isOpen,
  setIsOpen,
  dashboardId,
  afterSubmit,
}: ModalProps) {
  const [inputValue, setInputValue] = useState<string>('');
  const [columnList, setColumnList] = useState<Array<string>>([]);
  const [check, setCheck] = useState(false);

  // 컬럼 목록 title 조회
  const apiColumnData = useCallback(async () => {
    try {
      const response = await apiGetColumnList(dashboardId);
      if (response.result === 'SUCCESS') {
        const titles = Array.isArray(response.data)
          ? response.data.map((column: ColumnOverAll) => column.title)
          : [];
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

  // 컬럼 생성 동작
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newDashboard = {
      title: inputValue,
      dashboardId,
    };

    try {
      const response = await apiCreateColumn(newDashboard);
      setIsOpen(false);
      const { id } = response;

      if (id) {
        apiColumnData();
      }
    } catch (error) {
      throw new Error('error');
    }
    afterSubmit();
  };

  useEffect(() => {
    if (dashboardId) {
      apiColumnData();
    }
  }, [dashboardId, apiColumnData]);

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
  }, [inputValue, columnList, columnCheck]);

  // 모달 닫기
  const close = () => {
    setIsOpen(false);
  };

  return (
    <ModalContainer isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className={styles.container}>
        <h1>새 컬럼 생성</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.content}>
            <label htmlFor="name">이름</label>
            <input
              className={styles.inputText}
              type="text"
              id="name"
              name="name"
              placeholder="이름을 입력해 주세요"
              required
              onChange={handleChange}
            />
            {check && (
              <p className={styles.errorMessage}>중복된 컬럼 이름입니다.</p>
            )}
          </div>

          <div className={styles.buttonBlock}>
            <DeleteBtn BtnText="취소" handleBtn={close} />
            {inputValue && !check ? (
              <button className={styles.activeButton} type="submit">
                생성
              </button>
            ) : (
              <button className={styles.inactiveButton} type="submit" disabled>
                생성
              </button>
            )}
          </div>
        </form>
      </div>
    </ModalContainer>
  );
}

export default NewColumnModal;
