import InputPassword from './InputPassword';

function InputPasswordCheck() {
  return (
    <>
      <InputPassword
        inputText="비밀번호 확인"
        id="signUp-password-check"
        name="signUp-password-check"
        type="password"
        placeholder="비밀번호를 한번 더 입력해 주세요"
      />
    </>
  );
}

export default InputPasswordCheck;
