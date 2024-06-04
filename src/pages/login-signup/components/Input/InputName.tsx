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
        placeholder="닉네임을 입력해 주세요."
        errorText="열 자 이하로 작성해 주세요."
      />
    </div>
  );
}

export default InputName;
