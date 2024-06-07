import { useCallback, useState } from 'react';
import ModalContainer from '../ModalContainer/ModalContainer';
import DropdownMenu from '../components/DropdownMenu/DropdownMenu';
import ManagerDropdown from '../components/ManagerDropdown/ManagerDropdown';
import Calendar from '../components/Calendar/Calendar';
import InputTag from '../components/InputTag/InputTag';
import InputImage from '../components/InputImage/InputImage';
import styles from './EditTodoModal.module.scss';
import TestImg from '/img/test_img.png';

/*
  할 일 수정을 위한 모달입니다.
*/

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

// 할 일 데이터가 필요
function EditTodoModal({ isOpen, setIsOpen }: ModalProps) {
  const [condition, setCondition] = useState('test1');
  const [manager, setManager] = useState('test1');
  const [profile, setProfile] = useState(TestImg);
  const [title, setTitle] = useState('test');
  const [contents, setContents] = useState('test');
  const [deadline, setDeadline] = useState<Date | null>(new Date());
  const [tags, setTags] = useState(['테스트1', '태스트2', '테스트태그']);
  const [uploadImgUrl, setUploadImgUrl] = useState(TestImg);

  // -------------------------------------------------------------

  // 테스트 데이터
  const data = [
    {
      id: 1,
      text: 'test1',
      profile: TestImg,
    },
    {
      id: 2,
      text: 'test2',
      profile: TestImg,
    },
    {
      id: 3,
      text: '3333',
      profile: TestImg,
    },
    {
      id: 4,
      text: '4444',
      profile: TestImg,
    },
  ];

  // ------------------------------------------------------------------

  // 모달 닫기
  const close = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  // 할 일 수정 버튼 클릭 시 동작
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  // ------------------------------------------------------------------

  return (
    <ModalContainer isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className={styles.container}>
        <h1>할 일 수정</h1>

        <form onSubmit={handleSubmit}>
          <div className={styles.content}>
            <div className={styles.contentDropdown}>
              <div className={styles.contentBlock}>
                <h3>상태</h3>
                <DropdownMenu
                  value={condition}
                  setValue={setCondition}
                  data={data}
                />
              </div>
              <div className={styles.contentBlock}>
                <h3>담당자</h3>
                <ManagerDropdown
                  value={manager}
                  setValue={setManager}
                  data={data}
                  profile={profile}
                  setProfile={setProfile}
                />
              </div>
            </div>

            <div className={styles.contentBlock}>
              <label htmlFor="title">
                제목
                <span className={styles.contentSpan}> *</span>
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`${styles.contentInput} ${styles.inputTop}`}
                type="text"
                id="title"
                name="title"
                placeholder="제목을 입력해 주세요"
                required
              />
            </div>

            <div className={styles.contentBlock}>
              <label htmlFor="content">
                설명
                <span className={styles.contentSpan}> *</span>
              </label>
              <textarea
                value={contents}
                onChange={(e) => setContents(e.target.value)}
                className={styles.textarea}
                id="content"
                name="content"
                placeholder="설명을 입력해 주세요"
              />
            </div>

            <div className={styles.contentBlock}>
              <h3>마감일</h3>
              <Calendar deadline={deadline} setDeadline={setDeadline} />
            </div>

            <InputTag tags={tags} setTags={setTags} />

            <InputImage uploadImgUrl={uploadImgUrl} setUploadImgUrl={setUploadImgUrl} />
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
