import { useCallback, useEffect, useState } from 'react';
import TodoCardModal from '../TodoCardModal/TodoCardModal';
import EditTodoModal from '../EditTodoModal/EditTodoModal';
import { apiCardDetails } from '../../../api/apiModule';
// import TestImg from '/img/test_img.png';

/*
  할 일 카드 정보를 보여주는 모달과 할 일 수정 모달을 관리합니다.

  TodoCardModal에서 수정하기 버튼을 클릭하면
  TodoCardModal은 닫고 EditTodoModal이 열립니다.
*/

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  cardId: number;
  userId: number;
  columnId: number;
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

// interface CardOverAllResponse {
//   status: number;
//   data: CardOverAll;
// }

function TodoCardManagement({
  isOpen,
  setIsOpen,
  cardId,
  userId,
  columnId,
}: ModalProps) {
  const [testData, setTestData] = useState<CardOverAll | undefined>();

  const [todoModalOpen, setTodoModalOpen] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);

  // 카드 상세 조회
  const columnData = useCallback(async () => {
    try {
      const response = await apiCardDetails(cardId);
      if (response) {
        setTestData(response);
      } else {
        throw new Error('error');
      }
    } catch (error) {
      throw new Error('error');
    }
  }, [cardId]);

  useEffect(() => {
    if (cardId) {
      columnData();
    }
  }, [cardId, columnData]);

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
          cardId={cardId}
          cardData={testData}
        />
      )}
      {editModalOpen && (
        <EditTodoModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          openTodoModal={openTodoModal}
          cardId={cardId}
          cardData={testData}
          userId={userId}
          columnId={columnId}
        />
      )}
    </>
  );
}

export default TodoCardManagement;
