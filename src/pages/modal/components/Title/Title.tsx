import styles from './Title.module.scss';

/*
  할 일 모달에 제목을 작성하는 부분입니다.
*/

interface ModalProps {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>
}

function Title({ title, setTitle }: ModalProps) {
  return (
    <div className={styles.contentBlock}>
      <label htmlFor="title">
        제목
        <span className={styles.contentSpan}> *</span>
      </label>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={`${styles.contentInput} ${styles.inputTop}`}
        type="text"
        id="title"
        name="title"
        placeholder="제목을 입력해 주세요"
        required
      />
    </div>
  );
}

export default Title;
