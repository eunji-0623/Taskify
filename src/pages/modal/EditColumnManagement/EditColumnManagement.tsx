import { useState } from 'react';
import EditColumnModal from '../EditColumnModal/EditColumnModal';
import DeleteColumnModal from '../DeleteColumnModal/DeleteColumnModal';

/*
  컬럼 수정 모달과 삭제하기 모달을 관리합니다.

  EditColumnModal에서 "삭제하기" 버튼을 클릭하면
  EditColumnModal은 닫고 DeleteColumnModal이 열립니다.
*/

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

// 컬럼 데이터 추가 필요 useState로 관리
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
