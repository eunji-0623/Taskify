import styles from './Button.module.scss';

type ButtonProps = {
  ButtonText: string;
};

function Button({ ButtonText }: ButtonProps) {
  return (
    <div className={styles.buttonContainer}>
      <button className={styles.button} type="submit">
        {ButtonText}
      </button>
    </div>
  );
}

export default Button;
