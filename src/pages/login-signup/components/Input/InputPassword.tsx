import { useState } from 'react';
import styles from './Input.module.scss';
import classNames from 'classnames';
import EyeOn from '../../../../../public/icon/eye_on.svg';
import EyeOff from '../../../../../public/icon/eye_off.svg';

type InputPasswordProps = {
  inputText: string;
  id: string;
  name: string;
  type: string;
  placeholder: string;
  errorText: string;
};

function InputPassword({
  inputText,
  id,
  name,
  type,
  placeholder,
  errorText,
}: InputPasswordProps) {
  const [toggleVisible, setToggleVisible] = useState(false);

  // 눈 모양 아이콘 토글 함수
  const toggleButton = () => {
    const toggleIcon = document.getElementById(id) as HTMLInputElement;
    setToggleVisible(!toggleVisible);
    toggleIcon.type = toggleVisible ? 'password' : 'text';
  };

  // 에러 스타일 선언
  const errorInputClass = classNames(styles.emailInputSection, {
    [styles.errorInput]: type === 'error',
  });
  const errorTextClass = classNames(styles.errorText, {
    [styles.hide]: type !== 'error',
  });

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
          type={type}
          placeholder={placeholder}
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
