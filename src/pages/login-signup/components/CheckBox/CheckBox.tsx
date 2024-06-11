import { useState } from 'react';
import styles from './CheckBox.module.scss';

// 이용 약관에 동의합니다 체크 박스를 구현하는 컴포넌트 입니다.
// handleCheckboxChange 함수를 통해 체크박스의 상태를 관리합니다.
// LoginForm, SignUpForm 컴포넌트에서 사용됩니다.

// 타입 정의
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

  // 페이지 리턴
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
