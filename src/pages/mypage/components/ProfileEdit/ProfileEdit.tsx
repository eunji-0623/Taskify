import styles from './ProfileEdit.module.scss';
import PlusImage from '../../../../../public/icon/add_blue.svg';
import InputLayout from '../InputLayout/InputLayout';
import Button from '../Button/Button';

function ProfileEdit() {
  // true로 설정하면서 알맞은(ProfileInput) 스타일로 설정
  const isProfile = true;
  // true면 맨 위 Input의 margin-top 제거
  const topMargin = true;

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
            isProfile={isProfile}
            topMargin={topMargin}
          />
          <InputLayout
            labelText="닉네임"
            id="myPage-name"
            name="myPage-name"
            type="text"
            placeholder="닉네임 입력"
            isProfile={isProfile}
            topMargin={!topMargin}
          />
        </div>
      </div>
      <Button ButtonText="변경" />
    </div>
  );
}

export default ProfileEdit;
