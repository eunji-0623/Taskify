import { useState } from 'react';
import EditColumnModal from '../EditColumnModal/EditColumnModal';
import DeleteColumnModal from '../DeleteColumnModal/DeleteColumnModal';

/*
  컬럼 수정 모달과 삭제하기 모달을 관리합니다.

  EditColumnModal에서 "삭제하기" 버튼을 클릭하면
  EditColumnModal는 닫고 DeleteColumnModal가 열립니다.
*/

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

function EditColumnManagement({ isOpen, setIsOpen }: ModalProps) {
  const [editModalOpen, setEditModalOpen] = useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const openDeleteModal = () => {
    setDeleteModalOpen(true);
    setEditModalOpen(false);
  };

  const openEditModal = () => {
    setDeleteModalOpen(false);
    setEditModalOpen(true);
  };

  return (
    <>
      {editModalOpen && (
        <EditColumnModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          openDeleteModal={openDeleteModal}
        />
      )}
      {deleteModalOpen && (
        <DeleteColumnModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          openEditModal={openEditModal}
        />
      )}
    </>
  );
}

export default EditColumnManagement;

/*
  사용방법
  function ModalPageTest() {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    function handleColumnClick() {
      setIsEditModalOpen(!isEditModalOpen);
    }

    return (
      <div>
        <button type="button" onClick={handleColumnClick}>버튼</button>
        {isEditModalOpen
          ? <EditColumnManagement isOpen={isEditModalOpen} setIsOpen={setIsEditModalOpen} />
          : null}
      </div>
    );
  }

  export default ModalPageTest;
*/
