import styles from './Button.module.scss';

// 각 변경 사항을 최종 제출하는 버튼입니다.
// ProfileEdit, PasswordEdit 컴포넌트에서 사용됩니다.
// ButtonText, onClick, disabled 를 각 부모 컴포넌트에서 받아옵니다.

type ButtonProps = {
  ButtonText: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
};

function Button({ ButtonText, onClick, disabled }: ButtonProps) {
  return (
    <div className={styles.buttonContainer}>
      <button
        className={styles.button}
        type="submit"
        onClick={onClick}
        disabled={disabled}
      >
        {ButtonText}
      </button>
    </div>
  );
}

export default Button;
