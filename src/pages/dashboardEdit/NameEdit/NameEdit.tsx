import {
  useState, useEffect, Dispatch, SetStateAction,
} from 'react';
import styles from './NameEdit.module.scss';
import { ChangeAndSaveBtn } from '../../../components/Btn/Btn';
import { apiEditDashboards } from '../../../api/apiModule';
import Chips from './Chips';

/*  대시보드 수정 페이지 중
    이름과 색상을 바꾸기 위한 부분입니다.  */

interface Props {
  name: string;
  color: string;
  dashboardId: number;
  handleChange: Dispatch<SetStateAction<string>>;
}

function Info({
  name, color, dashboardId, handleChange,
}: Props) {
  const [newName, setNewName] = useState('');
  const [selectedColor, setSelectedColor] = useState(color);

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value);
  };

  const handleSubmitButton = async () => {
    handleChange(newName);
    await apiEditDashboards(
      { title: newName, color: selectedColor },
      { dashboardId },
    );
  };

  useEffect(() => {
    setSelectedColor(color);
  }, [color]);

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <h3 className={styles.name}>{name}</h3>
        <Chips
          selectedColor={selectedColor}
          handleSelectColor={setSelectedColor}
        />
      </div>
      <div className={styles.change}>
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
