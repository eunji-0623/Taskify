import ModalContainer from '../ModalContainer/ModalContainer';

export default function AlertModal({ isOpen, setIsOpen, children }) {
  return (
    <ModalContainer isOpen={isOpen} setIsOpen={setIsOpen}>
      <div>{children}</div>
    </ModalContainer>
  );
}
