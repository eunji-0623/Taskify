import { useState } from 'react';
import styles from './Input.module.scss';
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
  errorText
}: InputPasswordProps) {
  const [toggleVisible, setToggleVisible] = useState(false);

  // 눈 모양 아이콘 토글 함수
  const toggleButton = () => {
    const toggleIcon = document.getElementById(
      'login-password'
    ) as HTMLInputElement;
    setToggleVisible(!toggleVisible);
    toggleIcon.type = toggleVisible ? 'password' : 'text';
  };

  return (
    <>
      <label htmlFor={id} className={styles.inputText}>
        {inputText}
      </label>
      <div className={styles.passwordInputContainer}>
        <input
          className={styles.passwordInputSection}
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
      <span className="errorText">{errorText}</span>
    </>
  );
}

export default InputPassword;
