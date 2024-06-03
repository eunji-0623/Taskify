import { useState } from 'react';
import styles from './CheckBox.module.scss';

type CheckboxProps = {
  Label: string;
};

function Checkbox({ Label }: CheckboxProps) {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
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
      <label className={styles.checkboxLabel}>{Label}</label>
    </div>
  );
}

export default Checkbox;
