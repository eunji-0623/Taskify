import classNames from 'classnames';
import styles from './Input.module.scss';
import { InputType } from '../utils/constants';

interface InputEmailProps {
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

function InputEmail({
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
}: InputEmailProps) {
  const errorInputClass = classNames(styles.emailInputSection, {
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
      <input
        className={errorInputClass}
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
      />
      <span className={errorTextClass}>{errorText}</span>
    </>
  );
}

export default InputEmail;
