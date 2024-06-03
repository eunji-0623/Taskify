import styles from './Input.module.scss';

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
  return (
    <>
      <label htmlFor={id} className={styles.inputText}>
        {inputText}
      </label>
      <input
        className={styles.emailInputSection}
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
      />
      <span className="errorText">{errorText}</span>
    </>
  );
}

export default InputEmail;
