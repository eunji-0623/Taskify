import classNames from 'classnames';
import styles from './InputLayout.module.scss';

// Input 구역을 담당하는 컴포넌트입니다.
// 부모 컴포넌트에서 원하는 Props를 받아옵니다.
// 부모 컴포넌트에서 readOnly, disabled, onChange, onBlur, error를 원하는 상태로 정의합니다.
// 상태 정의에 따라서 다른 스타일을 적용합니다.

type InputLayoutProps = {
  id: string;
  name: string;
  type: string;
  labelText: string;
  placeholder: string;
  topMargin: boolean;
  isProfile: boolean;
  value: string;
  readOnly: boolean;
  disabled: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
};

function InputLayout({
  id,
  name,
  type,
  labelText,
  placeholder,
  topMargin,
  isProfile,
  value,
  onChange,
  onBlur,
  readOnly,
  disabled,
  error,
}: InputLayoutProps) {
  const inputContainerClass = classNames({
    [styles.topInputContainer]: topMargin,
    [styles.normalInputContainer]: !topMargin,
  });

  const inputSectionClass = classNames({
    [styles.profileInputSection]: isProfile,
    [styles.passwordInputSection]: !isProfile,
    [styles.error]: error,
  });

  return (
    <div className={inputContainerClass}>
      <label htmlFor={id} className={styles.inputLabel}>
        {labelText}
      </label>
      <input
        className={inputSectionClass}
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        readOnly={readOnly}
        disabled={disabled}
      />
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
}

export default InputLayout;
