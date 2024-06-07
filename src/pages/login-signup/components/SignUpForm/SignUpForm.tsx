import styles from './SignUpForm.module.scss';
// import InputEmail from '../Input/InputEmail';
import InputName from '../Input/InputName';
// import InputPassword from '../Input/InputPassword';
import InputPasswordCheck from '../Input/InputPasswordCheck';
import Checkbox from '../CheckBox/CheckBox';
// import Button from '../Button/Button';

function SignUpForm() {
  return (
    <form className={styles.formContainer}>
      <div className={styles.emailContainer}>
        {/* <InputEmail
          inputText="이메일"
          id="signUp-email"
          name="signUp-email"
          type="email"
          placeholder="이메일을 입력해 주세요"
          errorText="이메일 형식으로 작성해 주세요."
        /> */}
      </div>
      <InputName />
      <div className={styles.passwordContainer}>
        {/* <InputPassword
          inputText="비밀번호"
          id="signUp-password"
          name="signUp-password"
          type="password"
          placeholder="8자 이상 입력해 주세요"
          errorText="비밀번호가 일치하지 않습니다."
        /> */}
      </div>
      <div className={styles.passwordContainer}>
        <InputPasswordCheck />
      </div>
      <Checkbox Label="이용약관에 동의합니다." />
      {/* <Button
        pageName="signUp"
        buttonText={loading ? '회원가입 중...' : '회원가입'}
        isDisabled={isButtonDisabled || loading}
      /> */}
    </form>
  );
}

export default SignUpForm;
