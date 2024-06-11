import styles from './Button.module.scss';

// 로그인, 회원가입 페이지 하단의 버튼입니다.
// 페이지에 따라서 버튼에 표시되는 텍스트를 다르게 합니다.
// 상위 요소에서 isDisabled를 받아서 활성화 비활성화 상태를 구현합니다.
// LoginForm, SignUpForm 컴포넌트에서 사용됩니다.

// 타입 정의
interface ButtonProps {
  buttonText: string;
  pageName: string;
  isDisabled: boolean;
}

function Button({ buttonText, pageName, isDisabled }: ButtonProps) {
  // 페이지 리턴
  return (
    <button
      className={styles.Button}
      id={`${pageName}-button`}
      type="submit"
      disabled={isDisabled}
    >
      {buttonText}
    </button>
  );
}

export default Button;
