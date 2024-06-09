import { useState } from 'react';
import TodoCardModal from '../TodoCardModal/TodoCardModal';
import EditTodoModal from '../EditTodoModal/EditTodoModal';
import TestImg from '/img/test_img.png';

/*
  할 일 카드 정보를 보여주는 모달과 할 일 수정 모달을 관리합니다.

  TodoCardModal에서 수정하기 버튼을 클릭하면
  TodoCardModal은 닫고 EditTodoModal이 열립니다.
*/

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const test = {
  id: 7685,
  title: 'Task Title',
  description: 'This is a description of the task.',
  tags: [
    'urgent',
    'important',
  ],
  dueDate: '2024-07-05 04:04',
  assignee: {
    id: 3635,
    nickname: 'test1',
    profileImageUrl: TestImg,
  },
  imageUrl: TestImg,
  teamId: '5-8',
  columnId: 29765,
  dashboardId: 8855,
  createdAt: '2024-06-09T23:08:40.422Z',
  updatedAt: '2024-06-09T23:08:40.422Z',
};

// 카드 데이터 추가 필요 useState로 관리
function TodoCardManagement({ isOpen, setIsOpen }: ModalProps) {
  const [todoModalOpen, setTodoModalOpen] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const [cardState, setCardState] = useState('test2');
  const [manager, setManager] = useState(test.assignee.nickname);
  const [managerImg, setManagerImg] = useState(test.assignee.profileImageUrl);
  const [title, setTitle] = useState(test.title);
  const [description, setDescription] = useState(test.description);
  const [dueDate, setDueDate] = useState(test.dueDate);
  const [tags, setTags] = useState(test.tags);
  const [imageUrl, setImageUrl] = useState(test.imageUrl);

  const cardData = {
    cardState, manager, managerImg, title, description, dueDate, tags, imageUrl,
  };

  const cardSetData = {
    setCardState,
    setManager,
    setManagerImg,
    setTitle,
    setDescription,
    setDueDate,
    setTags,
    setImageUrl,
  };

  const openEditModal = () => {
    setEditModalOpen(true);
    setTodoModalOpen(false);
  };

  const openTodoModal = () => {
    setEditModalOpen(false);
    setTodoModalOpen(true);
  };

  return (
    <>
      {todoModalOpen && (
        <TodoCardModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          openEditModal={openEditModal}
          cardData={cardData}
        />
      )}
      {editModalOpen && (
        <EditTodoModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          openTodoModal={openTodoModal}
          cardData={cardData}
          cardSetData={cardSetData}
        />
      )}
    </>
  );
}

export default TodoCardManagement;
