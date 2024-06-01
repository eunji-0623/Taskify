import { ReactNode } from 'react';
import ModalContainer from '../ModalContainer/ModalContainer';
import styles from './AlertModal.module.scss';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children: ReactNode;
}

/** */
function AlertModal({ isOpen, setIsOpen, children }: ModalProps) {
  return (
    <ModalContainer isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className={styles.container}>{children}</div>
    </ModalContainer>
  );
}

export default AlertModal;
