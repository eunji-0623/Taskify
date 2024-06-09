import { useCallback, useState } from 'react';
import ModalContainer from '../ModalContainer/ModalContainer';
import DropdownManagement from '../components/DropdownManagement/DropdownManagement';
import Title from '../components/Title/Title';
import Calendar from '../components/Calendar/Calendar';
import TodoContent from '../components/TodoContent/TodoContent';
import InputTag from '../components/InputTag/InputTag';
import InputImage from '../components/InputImage/InputImage';
import styles from './NewTodoModal.module.scss';
import AddIcon from '/icon/add_image_box.svg';
import TestImg from '/img/test_img.png';

/*
  할 일 생성을 위한 모달입니다.
*/

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

function NewTodoModal({ isOpen, setIsOpen }: ModalProps) {
  const [manager, setManager] = useState('');
  const [managerImg, setManagerImg] = useState(TestImg);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState(AddIcon);

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
  ];

  // 모달 닫기
  const close = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  // 새로운 할 일 생성 동작
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <ModalContainer isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className={styles.container}>
        <h1>할 일 생성</h1>

        <form onSubmit={handleSubmit}>
          <div className={styles.content}>
            <DropdownManagement
              cardState=""
              setCardState={() => {}}
              manager={manager}
              setManager={setManager}
              data={data}
              managerImg={managerImg}
              setManagerImg={setManagerImg}
              text="new"
            />

            <Title title={title} setTitle={setTitle} />

            <TodoContent description={description} setDescription={setDescription} />

            <Calendar dueDate={dueDate} setDueDate={setDueDate} />

            <InputTag tags={tags} setTags={setTags} />

            <InputImage imageUrl={imageUrl} setImageUrl={setImageUrl} text="new" />
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

export default NewTodoModal;
