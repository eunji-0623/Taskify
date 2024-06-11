import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import ColorCircle from '../../../components/chip/ColorCircle/ColorCircle';
import styles from './NameEdit.module.scss';
import { ChangeAndSaveBtn } from '../../../components/Btn/Btn';
import { apiEditDashboards } from '../../../api/apiModule';

/*  대시보드 수정 페이지 중
    이름과 색상을 바꾸기 위한 부분입니다.  */

interface Props {
  name: string;
  color: string;
  dashboardId: number;
  handleChange: Dispatch<SetStateAction<string>>;
}

const COLORS = ['#7AC555', '#760DDE', '#FFA500', '#76A5EA', '#E876EA'];

function Info({ name, color, dashboardId, handleChange }: Props) {
  const [newName, setNewName] = useState('');
  const [selectedColor, setSelectedColor] = useState(color);

  const handleClickChips = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedColor(event.target.value);
  };

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value);
  };

  const handleSubmitButton = async () => {
    handleChange(newName);
    await apiEditDashboards(
      { title: newName, color: selectedColor },
      { dashboardId: dashboardId }
    );
  };

  useEffect(() => {
    setSelectedColor(color);
  }, [color]);

  return (
    <div className={styles.container}>
      <div className={styles.present}>
        <h3 className={styles.name}>{name}</h3>
        <div className={styles.chips}>
          <label>
            <input
              type="radio"
              value={COLORS[0]}
              checked={selectedColor === COLORS[0]}
              onChange={handleClickChips}
            />
            <ColorCircle color={COLORS[0]} diameter={30}>
              {selectedColor === COLORS[0] ? (
                <img src="/icon/checked.svg" />
              ) : null}
            </ColorCircle>
          </label>
          <label>
            <input
              type="radio"
              value={COLORS[1]}
              checked={selectedColor === COLORS[1]}
              onChange={handleClickChips}
            />
            <ColorCircle color={COLORS[1]} diameter={30}>
              {selectedColor === COLORS[1] ? (
                <img src="/icon/checked.svg" />
              ) : null}
            </ColorCircle>
          </label>
          <label>
            <input
              type="radio"
              value={COLORS[2]}
              checked={selectedColor === COLORS[2]}
              onChange={handleClickChips}
            />
            <ColorCircle color={COLORS[2]} diameter={30}>
              {selectedColor === COLORS[2] ? (
                <img src="/icon/checked.svg" />
              ) : null}
            </ColorCircle>
          </label>
          <label>
            <input
              type="radio"
              value={COLORS[3]}
              checked={selectedColor === COLORS[3]}
              onChange={handleClickChips}
            />
            <ColorCircle color={COLORS[3]} diameter={30}>
              {selectedColor === COLORS[3] ? (
                <img src="/icon/checked.svg" />
              ) : null}
            </ColorCircle>
          </label>
          <label>
            <input
              type="radio"
              value={COLORS[4]}
              checked={selectedColor === COLORS[4]}
              onChange={handleClickChips}
            />
            <ColorCircle color={COLORS[4]} diameter={30}>
              {selectedColor === COLORS[4] ? (
                <img src="/icon/checked.svg" />
              ) : null}
            </ColorCircle>
          </label>
        </div>
      </div>
      <div className={styles.new}>
        <p className={styles.description}>대시보드 이름</p>
        <input
          className={styles.newNameInput}
          placeholder="변경할 이름을 입력해주세요"
          onChange={handleChangeName}
        />
        <div className={styles.submitButton}>
          <ChangeAndSaveBtn BtnText="변경" handleBtn={handleSubmitButton} />
        </div>
      </div>
    </div>
  );
}

export default Info;
