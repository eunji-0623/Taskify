import { useCallback, useState } from 'react';
import ModalContainer from '../ModalContainer/ModalContainer';
import { DeleteBtn, ChangeAndSaveBtn } from '../../../components/Btn/Btn';
import ColorCircle from '../../../components/chip/ColorCircle/ColorCircle';
import CheckedIcon from '/icon/checked.svg';

import styles from './NewDashModal.module.scss';

/*
  대시보드 생성하는 모달입니다.
  사용자가 대시보드 이름과 색을 선택할 수 있습니다.
*/

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const colors = ['#7AC555', '#760DDE', '#FFA500', '#76A5EA', '#E876EA'];

function NewDashModal({ isOpen, setIsOpen }: ModalProps) {
  const [colorId, setColorId] = useState<number | null>(null);

  // 모달 닫기
  const close = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  // 새로운 대시보드 생성 동작
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  function handleClick(i: number) {
    setColorId(i);
  }

  return (
    <ModalContainer isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className={styles.container}>
        <h1>새로운 대시보드</h1>
        <form onSubmit={handleSubmit} className={styles.content}>
          <div className={styles.title}>
            <label htmlFor="name">대시보드 이름</label>
            <input type="text" id="name" name="name" placeholder="이름을 입력해 주세요" required />
          </div>

          <div className={styles.colorList}>
            {colors.map((item, i) => (
              <button
                className={styles.coloritem}
                key={item}
                type="button"
                aria-label={`색상 버튼 ${i + 1} 번`}
                onClick={() => handleClick(i)}
              >
                <ColorCircle color={item} diameter={30} />
                {
                  colorId === i ? <img className={styles.CheckedIcon} src={CheckedIcon} alt="Checked Icon" /> : null
                }
              </button>
            ))}
          </div>

          <div className={styles.buttonBlock}>
            <DeleteBtn BtnText="취소" handleBtn={close} />
            <ChangeAndSaveBtn BtnText="생성" handleBtn={close} />
          </div>
        </form>
      </div>
    </ModalContainer>
  );
}

export default NewDashModal;
