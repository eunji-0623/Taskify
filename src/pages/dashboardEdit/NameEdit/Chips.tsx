import { Dispatch, SetStateAction } from 'react';
import ColorCircle from '../../../components/chip/ColorCircle/ColorCircle';
import styles from './NameEdit.module.scss';

const COLORS = ['#7AC555', '#760DDE', '#FFA500', '#76A5EA', '#E876EA'];

interface Props {
  selectedColor: string;
  handleSelectColor: Dispatch<SetStateAction<string>>;
}

function Chips({ selectedColor, handleSelectColor }: Props) {
  const handleClickChips = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleSelectColor(event.target.value);
  };

  return (
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
            <img src="/icon/checked.svg" alt="체크" />
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
            <img src="/icon/checked.svg" alt="체크" />
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
            <img src="/icon/checked.svg" alt="체크" />
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
            <img src="/icon/checked.svg" alt="체크" />
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
            <img src="/icon/checked.svg" alt="체크" />
          ) : null}
        </ColorCircle>
      </label>
    </div>
  );
}

export default Chips;
