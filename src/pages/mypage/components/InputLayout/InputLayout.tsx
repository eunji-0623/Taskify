import classNames from 'classnames';
import styles from './InputLayout.module.scss';

type InputLayoutProps = {
  id: string;
  name: string;
  type: string;
  labelText: string;
  placeholder: string;
  topMargin: boolean;
  isProfile: boolean;
};

function InputLayout({
  id,
  name,
  type,
  labelText,
  placeholder,
  topMargin,
  isProfile,
}: InputLayoutProps) {
  // classNames로 Input의 스타일을 다르게 적용
  const inputContainerClass = classNames({
    [styles.topInputContainer]: topMargin,
    [styles.normalInputContainer]: !topMargin,
  });

  const inputSectionClass = classNames({
    [styles.profileInputSection]: isProfile,
    [styles.passwordInputSection]: !isProfile,
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
      />
    </div>
  );
}

export default InputLayout;
