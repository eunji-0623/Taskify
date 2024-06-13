import { useCallback, useEffect, useState } from 'react';
import ModalContainer from '../ModalContainer/ModalContainer';
import NewDropdownManagement from '../components/NewDropdownManagement/NewDropdownManagement';
import { apiCreateCard, apiMemberList } from '../../../api/apiModule';
import Title from '../components/Title/Title';
import Calendar from '../components/Calendar/Calendar';
import TodoContent from '../components/TodoContent/TodoContent';
import InputTag from '../components/InputTag/InputTag';
import InputImage from '../components/InputImage/InputImage';
import styles from './NewTodoModal.module.scss';
import TestImg from '/icon/testProfile.svg';

interface Member {
  id: number;
  userId: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
  isOwner: boolean;
}

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  userId: number;
  dashboardId: number;
  columnId: number;
  afterSubmit: () => void;
}

function NewTodoModal({
  isOpen,
  setIsOpen,
  userId,
  dashboardId,
  columnId,
  afterSubmit,
}: ModalProps) {
  const [manager, setManager] = useState('');
  const [managerImg, setManagerImg] = useState<string | undefined>(TestImg);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [members, setMembers] = useState<Member[]>([]);

  // 대시보드 멤버 목록 조회
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await apiMemberList({ dashboardId });
        setMembers(response.members);
      } catch (err) {
        throw new Error('error');
      }
    };

    fetchMembers();
  }, [dashboardId]);

  // 닫기
  const close = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  // 생성
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
    };

    // const uploadImageBody = {
    //   image: imageUrl,
    // };

    try {
      await Promise.all([
        apiCreateCard(newTodo),
        // apiUploadCardImage(uploadImageBody, columnId),
      ]);
      setIsOpen(false);
    } catch (error) {
      throw new Error('error');
    }
    afterSubmit();
  };

  const createButton = manager.length !== 0
    && title.length !== 0
    && description.length !== 0
    && dueDate.length !== 0
    && tags.length !== 0
    && imageUrl !== null;

  return (
    <ModalContainer isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className={styles.container}>
        <h1>할 일 생성</h1>

        <form onSubmit={handleSubmit}>
          <div className={styles.content}>
            <NewDropdownManagement
              manager={manager}
              setManager={setManager}
              managerImg={managerImg}
              setManagerImg={setManagerImg}
              members={members}
            />

            <Title title={title} setTitle={setTitle} />

            <TodoContent description={description} setDescription={setDescription} />

            <Calendar dueDate={dueDate} setDueDate={setDueDate} />

            <InputTag tags={tags} setTags={setTags} />

            <InputImage imageUrl={imageUrl} setImageUrl={setImageUrl} text="new" />
          </div>

          <div className={styles.buttonBlock}>
            <button className={styles.cancelButton} type="button" onClick={close}>
              취소
            </button>
            <button
              className={createButton ? styles.createButton : styles.inactiveButton}
              type="submit"
              disabled={!createButton}
            >
              생성
            </button>
          </div>
        </form>
      </div>
    </ModalContainer>
  );
}

export default NewTodoModal;
