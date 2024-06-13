import styles from './PasswordEdit.module.scss';
import InputLayout from '../InputLayout/InputLayout';
import Button from '../Button/Button';

function PasswordEdit() {
  // true면 ProfileInput 스타일, false면 passwordInput 스타일로 설정
  const isProfile = true;
  // true면 맨 위 Input의 margin-top 제거
  const topMargin = true;

  return (
    <div className={styles.passwordContainer}>
      <span className={styles.passwordText}>비밀번호 변경</span>
      <InputLayout
        labelText="현재 비밀번호"
        id="myPage-password-check"
        name="myPage-password-check"
        type="text"
        placeholder="현재 비밀번호 입력"
        isProfile={!isProfile}
        topMargin={topMargin}
      />
      <InputLayout
        labelText="새 비밀번호"
        id="myPage-new-password"
        name="myPage-new-password"
        type="text"
        placeholder="새 비밀번호 입력"
        isProfile={!isProfile}
        topMargin={!topMargin}
      />
      <InputLayout
        labelText="새 비밀번호 확인"
        id="myPage-new-password-check"
        name="myPage-new-password-check"
        type="text"
        placeholder="새 비밀번호 입력"
        isProfile={!isProfile}
        topMargin={!topMargin}
      />
      <Button ButtonText="변경" />
    </div>
  );
}

export default PasswordEdit;
