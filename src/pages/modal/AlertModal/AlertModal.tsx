import ModalContainer from '../ModalContainer/ModalContainer';
import styles from './AlertModal.module.scss';

function AlertModal({ isOpen, setIsOpen, children }) {
  return (
    <ModalContainer isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className={styles.modalTest}>{children}</div>
    </ModalContainer>
  );
}

export default AlertModal;
