import { useState } from 'react';
import classNames from 'classnames';
import styles from './Input.module.scss';
import InputType from '../utils/constants';
import EyeOn from '../../../../../public/icon/eye_on.svg';
import EyeOff from '../../../../../public/icon/eye_off.svg';

// 패스워드 입력 Input을 구현하는 컴포넌트 입니다.
// onChange, onBlur를 받아와서 에러를 구현합니다. (useInputHandlers)
// toggleButton으로 눈 모양 버튼의 상태에 따라 Input의 type을 변경합니다.
// LoginForm, SignUpForm 컴포넌트에서 사용됩니다.

// 타입 정의
interface InputPasswordProps {
  inputText: string;
  id: string;
  name: string;
  type: InputType;
  placeholder: string;
  errorText: string;
  value: string;
  error: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function InputPassword({
  inputText,
  id,
  name,
  type,
  placeholder,
  errorText,
  value,
  error,
  onChange,
  onBlur,
}: InputPasswordProps) {
  // 눈 모양 버튼 상태 관리
  const [toggleVisible, setToggleVisible] = useState(false);

  const toggleButton = () => {
    setToggleVisible(!toggleVisible);
  };

  // 조건을 만족하면 에러 스타일을 표시하도록 구현
  const errorInputClass = classNames(styles.passwordInputSection, {
    [styles.errorInput]: error,
  });

  const errorTextClass = classNames(styles.errorText, {
    [styles.hide]: !error,
  });

  // 페이지 리턴
  // 상위 요소에서 Props를 할당 받아서 그에 맞는 스타일을 구현.
  return (
    <>
      <label htmlFor={id} className={styles.inputText}>
        {inputText}
      </label>
      <div className={styles.passwordInputContainer}>
        <input
          className={errorInputClass}
          id={id}
          name={name}
          type={type === InputType.Password && toggleVisible ? 'text' : type}
          placeholder={placeholder}
          value={value}
          onBlur={onBlur}
          onChange={onChange}
        />
        <button
          className={styles.toggleButton}
          type="button"
          onClick={toggleButton}
        >
          <img
            src={toggleVisible ? EyeOff : EyeOn}
            className={styles.toggleButtonImage}
            alt="눈 모양 버튼 이미지"
          />
        </button>
      </div>
      <span className={errorTextClass}>{errorText}</span>
    </>
  );
}

export default InputPassword;
