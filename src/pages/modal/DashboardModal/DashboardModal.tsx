// import { useCallback } from 'react';
// import ModalContainer from '../ModalContainer/ModalContainer';
// import styles from './DashboardModal.module.scss';

// /*
//   대시보드 생성하는 모달입니다.
//   isOpen, setIsOpen을 props로 받습니다.
// */

// interface ModalProps {
//   isOpen: boolean;
//   setIsOpen: (isOpen: boolean) => void;
// }

// function DashboardModal({ isOpen, setIsOpen }: ModalProps) {
//   // 모달 닫기
//   const close = useCallback(() => {
//     setIsOpen(false);
//   }, []);

//   function testSubmit(event) {
//     event.preventDefault();
//     console.log('submit');
//   }

//   return (
//     <ModalContainer isOpen={isOpen} setIsOpen={setIsOpen}>
//       <div className={styles.container}>
//         <h1>새로운 대시보드</h1>

//         <form onSubmit={testSubmit}>
//           <label htmlFor="name">대시보드 이름</label>
//           <input type="text" id="name" name="name" required />

//           <div>
//             <button type="button" onClick={close}>취소</button>
//             <button type="submit">생성</button>
//           </div>
//         </form>
//       </div>
//     </ModalContainer>
//   );
// }

// export default DashboardModal;
