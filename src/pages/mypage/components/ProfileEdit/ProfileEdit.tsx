import styles from './ProfileEdit.module.scss';
import PlusImage from '../../../../../public/icon/add_blue.svg';

type ProfileEditProps = {
  id: string;
  name: string;
  type: string;
  placeholder: string;
};

function ProfileEdit({ id, name, type, placeholder }: ProfileEditProps) {
  return (
    <div className={styles.profileContainer}>
      <span className={styles.profileText}>프로필</span>
      <div className={styles.profileSection}>
        <button className={styles.imageAddButton}>
          <img className={styles.plusImage} src={PlusImage} />
        </button>
        <div className={styles.inputLayout}>
          <div className={styles.inputContainer}>
            <label className={styles.inputLabel}>이메일</label>
            <input className={styles.inputSection} />
          </div>
          <div className={styles.inputContainer}>
            <label className={styles.inputLabel}>닉네임</label>
            <input
              className={styles.inputSection}
              id={id}
              name={name}
              type={type}
              placeholder={placeholder}
            />
          </div>
        </div>
      </div>
      <button className={styles.doneButton}>저장</button>
    </div>
  );
}

export default ProfileEdit;
