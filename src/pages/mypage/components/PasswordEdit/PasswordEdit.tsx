import styles from './PasswordEdit.module.scss';
import InputLayout from '../InputLayout/InputLayout';

function PasswordEdit() {
  return (
    <div className={styles.passwordContainer}>
      <span className={styles.passwordText}>비밀번호 변경</span>
      <InputLayout
        labelText="현재 비밀번호"
        id="myPage-password-check"
        name="myPage-password-check"
        type="text"
        placeholder="현재 비밀번호 입력"
      />
      <InputLayout
        labelText="새 비밀번호"
        id="myPage-password-check"
        name="myPage-password-check"
        type="text"
        placeholder="새 비밀번호 입력"
      />
      <InputLayout
        labelText="새 비밀번호 확인"
        id="myPage-password-check"
        name="myPage-password-check"
        type="text"
        placeholder="새 비밀번호 입력"
      />
      <button className={styles.doneButton} type="submit">
        변경
      </button>
    </div>
  );
}

export default PasswordEdit;
