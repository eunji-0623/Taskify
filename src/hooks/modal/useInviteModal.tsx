import { useCallback, useState } from 'react';
import InviteModal from '../../pages/modal/InviteModal/InviteModal';

/*
  모달의 렌더링 여부가 결정되는 state 생략을 위한 InviteModal hook입니다.
  InviteModal, openInvite 가 리턴되어 사용할 수 있습니다.
  const { InviteModal, openInvite } = useAlertModal();
*/

function useInviteModal() {
  const [isOpen, setIsOpen] = useState(false);

  // 모달 열기
  const openInvite = useCallback(() => {
    setIsOpen(true);
  }, []);

  return {
    InviteModal: isOpen
      ? () => <InviteModal isOpen={isOpen} setIsOpen={setIsOpen} />
      : () => null,
    openInvite,
    isOpen,
  };
}

export default useInviteModal;
