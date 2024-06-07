import styles from './Button.module.scss';

interface ButtonProps {
  buttonText: string;
  pageName: string;
  isDisabled: boolean;
}

function Button({ buttonText, pageName, isDisabled }: ButtonProps) {
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
