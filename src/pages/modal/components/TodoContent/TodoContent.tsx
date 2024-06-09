import styles from './TodoContent.module.scss';

interface ModalProps {
  description: string;
  setDescription : React.Dispatch<React.SetStateAction<string>>;
}

function TodoContent({ description, setDescription }: ModalProps) {
  return (
    <div className={styles.contentBlock}>
      <label htmlFor="content">
        설명
        <span className={styles.contentSpan}> *</span>
      </label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className={styles.textarea}
        id="content"
        name="content"
        placeholder="설명을 입력해 주세요"
      />
    </div>
  );
}

export default TodoContent;
