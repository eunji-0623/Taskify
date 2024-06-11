import classNames from 'classnames';
import styles from './Input.module.scss';
import { InputType } from '../utils/constants';

// 이메일 입력 Input을 구현하는 컴포넌트 입니다.
// onChange, onBlur를 받아와서 에러를 구현합니다. (useInputHandlers)
// LoginForm, SignUpForm 컴포넌트에서 사용됩니다.

// 타입 정의
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
  // 조건을 만족하면 에러 스타일 적용됨
  const errorInputClass = classNames(styles.emailInputSection, {
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
