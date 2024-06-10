import { useState } from 'react';
import styles from './CheckBox.module.scss';

interface CheckboxProps {
  Label: string;
  onChange: (isChecked: boolean) => void;
}

function Checkbox({ Label, onChange }: CheckboxProps) {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);

    // 변경된 상태를 부모 컴포넌트로 전달
    onChange(newCheckedState);
  };

  return (
    <div className={styles.checkboxContainer}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
        className={styles.checkbox}
        id="checkbox"
      />
      <label htmlFor="checkbox" className={styles.checkboxLabel}>
        {Label}
      </label>
    </div>
  );
}

export default Checkbox;
