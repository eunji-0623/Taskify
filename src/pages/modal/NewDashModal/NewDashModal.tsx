import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ModalContainer from '../ModalContainer/ModalContainer';
import { DeleteBtn } from '../../../components/Btn/Btn';
import ColorCircle from '../../../components/chip/ColorCircle/ColorCircle';
import { apiCreateDashboards } from '../../../api/apiModule';
import CheckedIcon from '/icon/checked.svg';
import styles from './NewDashModal.module.scss';

/*
  대시보드 이름, 색을 선택해서 생성 버튼을 클릭하면 `/dashboard/${id}` 페이지로 이동합니다.
*/

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const colors = ['#7AC555', '#760DDE', '#FFA500', '#76A5EA', '#E876EA'];

function NewDashModal({ isOpen, setIsOpen }: ModalProps) {
  const navigate = useNavigate();
  const [colorId, setColorId] = useState<number | null>(null);
  const [colorValue, setColorValue] = useState('');
  const [inputValue, setInputValue] = useState('');

  // /dashboard/{dashboardid}로 이동
  const goDashboard = (id: number) => {
    navigate(`/dashboard/${id}`);
  };

  const close = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newDashboard = {
      title: inputValue,
      color: colorValue,
    };

    try {
      const response = await apiCreateDashboards(newDashboard);
      const { id } = response;

      if (id) {
        goDashboard(id);
      }
    } catch (error) {
      throw new Error('error');
    }
  };

  const handleClick = (i: number) => {
    setColorId(i);
    setColorValue(colors[i]);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <ModalContainer isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className={styles.container}>
        <h1>새로운 대시보드</h1>
        <form onSubmit={handleSubmit} className={styles.content}>
          <div className={styles.title}>
            <label htmlFor="name">대시보드 이름</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="이름을 입력해 주세요"
              required
              onChange={handleChange}
            />
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
                {colorId === i && <img className={styles.CheckedIcon} src={CheckedIcon} alt="Checked Icon" />}
              </button>
            ))}
          </div>

          <div className={styles.buttonBlock}>
            <DeleteBtn BtnText="취소" handleBtn={close} />
            {(inputValue.length !== 0 && colorValue) ? (
              <button className={styles.activeButton} type="submit">
                생성
              </button>
            ) : (
              <button className={styles.inactiveButton} type="button" disabled>
                생성
              </button>
            )}
          </div>
        </form>
      </div>
    </ModalContainer>
  );
}

export default NewDashModal;
