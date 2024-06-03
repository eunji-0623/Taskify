import styles from './PasswordEdit.module.scss';

type PasswordEditProps = {
  id: string;
  name: string;
  type: string;
};

function PasswordEdit({ id, name, type }: PasswordEditProps) {
  return (
    <div className={styles.passwordContainer}>
      <span className={styles.passwordText}>비밀번호 변경</span>
      <div className={styles.inputContainer}>
        <label className={styles.inputLabel}>현재 비밀번호</label>
        <input
          className={styles.inputSection}
          id={id}
          name={name}
          type={type}
          placeholder="현재 비밀번호 입력"
        />
      </div>
      <div className={styles.inputContainer}>
        <label className={styles.inputLabel}>새 비밀번호</label>
        <input
          className={styles.inputSection}
          id={id}
          name={name}
          type={type}
          placeholder="새 비밀번호 입력"
        />
      </div>
      <div className={styles.inputContainer}>
        <label className={styles.inputLabel}>새 비밀번호 확인</label>
        <input
          className={styles.inputSection}
          id={id}
          name={name}
          type={type}
          placeholder="새 비밀번호 입력"
        />
      </div>
      <button className={styles.doneButton}>변경</button>
    </div>
  );
}

export default PasswordEdit;
