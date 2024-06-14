import { useEffect, useState } from 'react';
import ModalContainer from '../ModalContainer/ModalContainer';
import EditDropdownManagement from '../components/EditDropdownManagement/EditDropdownManagement';
import Title from '../components/Title/Title';
import Calendar from '../components/Calendar/Calendar';
import TodoContent from '../components/TodoContent/TodoContent';
import { apiGetColumnList, apiMemberList, apiUpdateCard } from '../../../api/apiModule';
import InputTag from '../components/InputTag/InputTag';
import EditInputImage from '../components/EditInputImage/EditInputImage';
import styles from './EditTodoModal.module.scss';

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

interface CardOverAll {
  id: number;
  title: string;
  description: string;
  tags: string[];
  dueDate: string;
  assignee: {
    profileImageUrl?: string;
    nickname: string;
    id: number;
  };
  imageUrl?: string;
  teamId: string;
  columnId: number;
  dashboardId: number;
  createdAt: string;
  updatedAt: string;
}

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  openTodoModal: () => void;
  cardId: number;
  cardData: CardOverAll | undefined;
  userId: number;
  columnId: number;
  dashboardId: number;
}

function EditTodoModal({
  isOpen,
  setIsOpen,
  openTodoModal,
  cardId,
  cardData,
  userId,
  columnId,
  dashboardId,
}: ModalProps) {
  const [cardState, setCardState] = useState<string>('');
  const [manager, setManager] = useState<string>('');
  const [managerImg, setManagerImg] = useState<string | undefined>(undefined);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [dueDate, setDueDate] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [members, setMembers] = useState<Member[]>([]);
  const [memberIdList, setMemberIdList] = useState<number[]>([]);
  const [clickManagerId, setClickManagerId] = useState<number>(userId);
  const [columnList, setColumnList] = useState<string[]>([]);
  const [columnListId, setColumnListId] = useState<number[]>([]);
  const [clickColumnId, setClickColumnId] = useState<number>(columnId);

  // 멤버 목록 조회
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await apiMemberList({ dashboardId });
        setMembers(response.members);

        const idList = Array.isArray(response.members)
          ? response.members.map((member) => member.userId)
          : [];
        setMemberIdList(idList);
      } catch (err) {
        throw new Error('error');
      }
    };

    fetchMembers();
  }, [dashboardId, userId]);

  // 컬럼 리스트 조회
  useEffect(() => {
    const fetchDashboardDetail = async () => {
      try {
        const response = await apiGetColumnList(dashboardId);
        if (response.result === 'SUCCESS') {
          const titles = Array.isArray(response.data)
            ? response.data.map((column) => column.title)
            : [];
          setColumnList(titles);

          const idList = Array.isArray(response.data)
            ? response.data.map((column) => column.id)
            : [];
          setColumnListId(idList);

          const column = response.data.find((item) => item.id === columnId);
          setCardState(column ? column.title : '');
        } else {
          throw new Error('error');
        }
      } catch (error) {
        throw new Error('error');
      }
    };

    fetchDashboardDetail();
  }, [dashboardId, columnId]);

  // 현재 데이터 추가
  useEffect(() => {
    if (cardData) {
      setManager(cardData.assignee.nickname);
      setManagerImg(cardData.assignee.profileImageUrl);
      setTitle(cardData.title);
      setDescription(cardData.description);
      setDueDate(cardData.dueDate);
      setTags(cardData.tags);
      setImageUrl(cardData.imageUrl || '');
    }
  }, [cardData]);

  // 수정 클릭
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (clickColumnId === 0) {
      setClickColumnId(columnId);
    }

    if (clickManagerId === 0) {
      setClickManagerId(userId);
    }

    const updateCard = {
      columnId: clickColumnId,
      assigneeUserId: clickManagerId,
      title,
      description,
      dueDate,
      tags,
      // imageUrl,
    };

    try {
      await apiUpdateCard(updateCard, cardId);
      setIsOpen(false);
    } catch (error) {
      throw new Error('error');
    }
  };

  const handleTodoOpen = () => {
    openTodoModal();
  };

  if (!cardData) {
    return null;
  }

  return (
    <ModalContainer isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className={styles.container}>
        <h1>할 일 수정</h1>

        <form onSubmit={handleSubmit}>
          <div className={styles.content}>
            <EditDropdownManagement
              cardState={cardState}
              setCardState={setCardState}
              columnList={columnList}
              columnListId={columnListId}
              setColumnId={setClickColumnId}
              manager={manager}
              setManager={setManager}
              managerImg={managerImg}
              setManagerImg={setManagerImg}
              members={members}
              memberIdList={memberIdList}
              setClickManagerId={setClickManagerId}
            />

            <Title title={title} setTitle={setTitle} />

            <TodoContent description={description} setDescription={setDescription} />

            <Calendar dueDate={dueDate} setDueDate={setDueDate} />

            <InputTag tags={tags} setTags={setTags} />

            <EditInputImage imageUrl={imageUrl} setImageUrl={setImageUrl} />
          </div>

          <div className={styles.buttonBlock}>
            <button className={styles.cancelButton} type="button" onClick={handleTodoOpen}>취소</button>
            <button className={styles.createButton} type="submit">수정</button>
          </div>
        </form>
      </div>
    </ModalContainer>
  );
}

export default EditTodoModal;
