import styles from './Input.module.scss';

type InputEmailProps = {
  inputText: string;
  id: string;
  name: string;
  type: string;
  placeholder: string;
};

function InputEmail({
  inputText,
  id,
  name,
  type,
  placeholder
}: InputEmailProps) {
  return (
    <>
      <label className={styles.inputText}>{inputText}</label>
      <input
        className={styles.emailInputSection}
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
      />
    </>
  );
}

export default InputEmail;
