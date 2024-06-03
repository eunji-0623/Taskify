import styles from './InputLayout.module.scss';

type InputLayoutProps = {
  id: string;
  name: string;
  type: string;
  labelText: string;
  placeholder: string;
};

function InputLayout({
  id,
  name,
  type,
  labelText,
  placeholder,
}: InputLayoutProps) {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={id} className={styles.inputLabel}>
        {labelText}
      </label>
      <input
        className={styles.inputSection}
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
}

export default InputLayout;
