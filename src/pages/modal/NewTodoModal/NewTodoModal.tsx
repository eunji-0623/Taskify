import { useCallback, useState } from 'react';
import ModalContainer from '../ModalContainer/ModalContainer';
import DropdownManagement from '../components/DropdownManagement/DropdownManagement';
import { apiCreateCard } from '../../../api/apiModule';
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
  userId: number;
  dashboardId: number;
  columnId: number;
}

function NewTodoModal({
  isOpen,
  setIsOpen,
  userId,
  dashboardId,
  columnId,
}: ModalProps) {
  const [manager, setManager] = useState('');
  const [managerImg, setManagerImg] = useState<string | undefined>(TestImg);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState(AddIcon);

  const check = manager.length !== 0
    && title.length !== 0
    && description.length !== 0
    && dueDate.length !== 0
    && tags.length !== 0;

  // 담당자 테스트
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
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newTodo = {
      assigneeUserId: userId,
      dashboardId,
      columnId,
      title,
      description,
      dueDate,
      tags,
      imageUrl: imageUrl !== AddIcon ? imageUrl : undefined,
    };

    try {
      await apiCreateCard(newTodo);
      setIsOpen(false);
    } catch (error) {
      throw new Error('error');
    }
  };

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
            <button className={check ? styles.createButton : styles.inactiveButton} type="submit">생성</button>
          </div>
        </form>
      </div>
    </ModalContainer>
  );
}

export default NewTodoModal;
