import { ReactNode } from 'react';
import ModalContainer from '../ModalContainer/ModalContainer';
import styles from './DashboardModal.module.scss';

/* 
  설명, 확인 버튼만 보여주는 Alert Modal 컴포넌트 입니다.
  isOpen, setIsOpen, children을 props로 받습니다.

  <p>설명</p>
  <button onClick={close}>확인</button>
*/

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children: ReactNode;
}

function DashboardModal({ isOpen, setIsOpen }: ModalProps) {
  return <ModalContainer isOpen={isOpen} setIsOpen={setIsOpen} />;
}

export default DashboardModal;
