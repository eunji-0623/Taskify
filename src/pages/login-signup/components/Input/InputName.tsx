import styles from './Input.module.scss';
import InputEmail from './InputEmail';

function InputName() {
  return (
    <div className={styles.nameContainer}>
      <InputEmail
        inputText="닉네임"
        id="signUp-name"
        name="signUp-name"
        type="text"
        placeholder="닉네임을 입력해주세요"
      />
    </div>
  );
}

export default InputName;
