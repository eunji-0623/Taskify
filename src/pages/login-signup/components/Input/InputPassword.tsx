import { useState } from 'react';
import styles from './Input.module.scss';
import classNames from 'classnames';
import EyeOn from '../../../../../public/icon/eye_on.svg';
import EyeOff from '../../../../../public/icon/eye_off.svg';

interface InputPasswordProps {
  inputText: string;
  id: string;
  name: string;
  type: string;
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
  const [toggleVisible, setToggleVisible] = useState(false);

  const toggleButton = () => {
    setToggleVisible(!toggleVisible);
  };

  const errorInputClass = classNames(styles.passwordInputSection, {
    [styles.errorInput]: error,
  });

  const errorTextClass = classNames(styles.errorText, {
    [styles.hide]: !error,
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
          type={toggleVisible ? 'text' : type}
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
