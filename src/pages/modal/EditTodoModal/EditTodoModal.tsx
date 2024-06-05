import { useCallback, useState } from 'react';
import ModalContainer from '../ModalContainer/ModalContainer';
import ModalDropdown from '../../../components/ModalDropdown/ModalDropdown';
import styles from './EditTodoModal.module.scss';

/*
  할 일 수정을 위한 모달입니다.
*/

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

// 할 일 데이터가 필요
function EditTodoModal({ isOpen, setIsOpen }: ModalProps) {
  const [condition, setCondition] = useState('test');
  const [manager, setManager] = useState('test');
  const [name, setName] = useState('test');
  const [description, setDescription] = useState('test');
  const [deadline, setDeadline] = useState('test');
  const [tags, setTags] = useState('test');

  // 테스트 데이터
  const data = [
    {
      id: 1,
      text: 'test1',
    },
    {
      id: 2,
      text: 'test2',
    },
    {
      id: 3,
      text: 'test3',
    },
    {
      id: 4,
      text: 'test4',
    },
  ];

  // 모달 닫기
  const close = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  // 할 일 수정 버튼 클릭 시 동작
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <ModalContainer isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className={styles.container}>
        <h1>할 일 수정</h1>

        <form onSubmit={handleSubmit}>
          <div className={styles.content}>
            <div className={styles.contentDropdown}>
              <div className={styles.contentBlock}>
                <h3>상태</h3>
                <ModalDropdown
                  value={condition}
                  setValue={setCondition}
                  data={data}
                />
              </div>

              <div className={styles.contentBlock}>
                <h3>담당자</h3>
                <ModalDropdown
                  value={manager}
                  setValue={setManager}
                  data={data}
                />
              </div>
            </div>

            <div className={styles.contentBlock}>
              <label htmlFor="name">
                제목
                <span className={styles.contentSpan}> *</span>
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={styles.contentInput}
                type="text"
                id="name"
                name="name"
                placeholder="제목을 입력해 주세요"
                required
              />
            </div>

            <div className={styles.contentBlock}>
              <label htmlFor="text">
                설명
                <span className={styles.contentSpan}> *</span>
              </label>
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={`${styles.contentText} ${styles.contentInput}`}
                type="text"
                id="text"
                name="text"
                placeholder="설명을 입력해 주세요"
                required
              />
            </div>

            <div className={styles.contentBlock}>
              <label htmlFor="deadline">마감일</label>
              <input
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className={styles.contentInput}
                type="text"
                id="deadline"
                name="deadline"
                placeholder="날짜를 입력해 주세요"
                required
              />
            </div>

            <div className={styles.contentBlock}>
              <label htmlFor="tags">태그</label>
              <input
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className={styles.contentInput}
                type="text"
                id="tags"
                name="tags"
                placeholder="입력 후 Enter"
                required
              />
            </div>

            <div className={styles.contentBlock}>
              <h3>이미지</h3>
              <div className={styles.contentImage}>이미지 추가+</div>
            </div>
          </div>

          <div className={styles.buttonBlock}>
            <button className={styles.cancelButton} type="button" onClick={close}>취소</button>
            <button className={styles.createButton} type="submit">수정</button>
          </div>
        </form>
      </div>
    </ModalContainer>
  );
}

export default EditTodoModal;
