import styles from './ProfileEdit.module.scss';
import PlusImage from '../../../../../public/icon/add_blue.svg';
import InputLayout from '../InputLayout/InputLayout';

function ProfileEdit() {
  return (
    <div className={styles.profileContainer}>
      <span className={styles.profileText}>프로필</span>
      <div className={styles.profileSection}>
        <button className={styles.imageAddButton} type="submit">
          <img
            className={styles.plusImage}
            src={PlusImage}
            alt="플러스 모양 이미지"
          />
        </button>
        <div className={styles.inputLayout}>
          <InputLayout
            labelText="이메일"
            id="myPage-email"
            name="myPage-email"
            type="email"
            placeholder="이메일 입력"
          />
          <InputLayout
            labelText="닉네임"
            id="myPage-name"
            name="myPage-name"
            type="text"
            placeholder="닉네임 입력"
          />
        </div>
      </div>
      <button className={styles.doneButton} type="submit">
        저장
      </button>
    </div>
  );
}

export default ProfileEdit;
