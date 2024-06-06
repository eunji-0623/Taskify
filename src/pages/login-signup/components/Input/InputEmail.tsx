import styles from './Input.module.scss';
import classNames from 'classnames';

type InputEmailProps = {
  inputText: string;
  id: string;
  name: string;
  type: string;
  placeholder: string;
  errorText: string;
};

function InputEmail({
  inputText,
  id,
  name,
  type,
  placeholder,
  errorText,
}: InputEmailProps) {
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
      <input
        className={errorInputClass}
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
      />
      <span className={errorTextClass}>{errorText}</span>
    </>
  );
}

export default InputEmail;
