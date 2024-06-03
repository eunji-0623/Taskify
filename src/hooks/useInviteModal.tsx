import { useCallback, useState } from 'react';
import InviteModal from '../pages/modal/InviteModal/InviteModal';

/*

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
