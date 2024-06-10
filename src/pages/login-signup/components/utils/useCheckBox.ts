import { useState } from 'react';

// 이용 약관에 동의하는 체크박스의 체크 상태를 관리하는 함수입니다.
function useCheckBox() {
  const [isCheckboxAgreed, setIsCheckboxAgreed] = useState(false);

  // Checkbox의 상태 변경을 처리하는 콜백 함수
  const handleCheckboxChange = (isChecked: boolean) => {
    setIsCheckboxAgreed(isChecked); // 이용약관 동의 상태를 변경합니다.
  };

  return {
    isCheckboxAgreed,
    handleCheckboxChange,
  };
}

export default useCheckBox;
