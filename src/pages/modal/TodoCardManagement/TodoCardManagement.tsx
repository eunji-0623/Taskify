import { useCallback, useEffect, useState } from 'react';
import TodoCardModal from '../TodoCardModal/TodoCardModal';
import EditTodoModal from '../EditTodoModal/EditTodoModal';
import { apiCardDetails, CardOverAll } from '../../../api/apiModule'; // CardOverAll 인터페이스를 가져옵니다

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  cardId: number;
  userId: number;
  columnId: number;
}

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
