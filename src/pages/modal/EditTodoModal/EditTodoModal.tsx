import { useEffect, useState } from 'react';
import ModalContainer from '../ModalContainer/ModalContainer';
import DropdownManagement from '../components/DropdownManagement/DropdownManagement';
import Title from '../components/Title/Title';
import Calendar from '../components/Calendar/Calendar';
import TodoContent from '../components/TodoContent/TodoContent';
import { apiUpdateCard } from '../../../api/apiModule';
import InputTag from '../components/InputTag/InputTag';
import InputImage from '../components/InputImage/InputImage';
import styles from './EditTodoModal.module.scss';
import TestImg from '/img/test_img.png';

/*
  할 일 수정을 위한 모달입니다.

  할 일 카드 모달과 연결을 위해 직접 사용하는 것이 아닌 TodoCardManagement를 통해 사용합니다.
*/

interface CardOverAll {
  id: number;
  title: string;
  description: string;
  tags: string[];
  dueDate: string;
  assignee: {
    profileImageUrl?: string | undefined
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
}

function EditTodoModal({
  isOpen,
  setIsOpen,
  openTodoModal,
  cardId,
  cardData,
  userId,
  columnId,
}: ModalProps) {
  const [cardState, setCardState] = useState('대시보드 이름');
  const [manager, setManager] = useState('');
  const [managerImg, setManagerImg] = useState<string | undefined>('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState('');

  // 데이터 추가
  useEffect(() => {
    if (cardData) {
      setCardState('test');
      setManager(cardData.assignee.nickname);
      setManagerImg(cardData.assignee.profileImageUrl);
      setTitle(cardData.title);
      setDescription(cardData.description);
      setDueDate(cardData.dueDate);
      setTags(cardData.tags);
      setImageUrl(cardData.imageUrl || '');
    }
  }, [cardData]);

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
  // const close = useCallback(() => {
  //   setIsOpen(false);
  // }, [setIsOpen]);

  // + 할 일 수정 버튼 클릭 시 동작 추가
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const updateCard = {
      columnId,
      assigneeUserId: userId,
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

  // 취소 버튼을 클릭하면 할 일 카드 모달로 돌아갑니다.
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
            <DropdownManagement
              cardState={cardState}
              setCardState={setCardState}
              manager={manager}
              setManager={setManager}
              data={data}
              managerImg={managerImg}
              setManagerImg={setManagerImg}
              text=""
            />

            <Title title={title} setTitle={setTitle} />

            <TodoContent description={description} setDescription={setDescription} />

            <Calendar dueDate={dueDate} setDueDate={setDueDate} />

            <InputTag tags={tags} setTags={setTags} />

            <InputImage imageUrl={imageUrl} setImageUrl={setImageUrl} text="" />
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
