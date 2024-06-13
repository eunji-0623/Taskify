import { useState } from 'react';
import Tag from '../../../../components/chip/Tag/Tag';
import CloseIcon from '/icon/close.svg';
import styles from './InputTag.module.scss';

/*
  Tag를 사용해서 enter를 누르면 태그로 바꿔주기 위한 컴포넌트입니다.
*/

interface InputProps {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
}

function InputTag({ tags, setTags }: InputProps) {
  const [newTag, setNewTag] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);

  // 엔터키를 눌렀을 때 동작
  function onKeyPress(e: React.KeyboardEvent<HTMLElement>) {
    setErrorMessage(false);

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();

      // 이미 추가된 태그인 경우
      if (tags.includes(newTag)) {
        setErrorMessage(true);
        return;
      }

      if (newTag.trim() !== '') {
        setTags((prevTags) => [...prevTags, newTag]);

        // 입력 후 input 초기화
        setNewTag('');
      }
    }
  }

  // 태그에 있는 삭제 버튼을 클릭
  function handleDelete(index: number) {
    setTags((prevTags) => {
      const updatedTags = prevTags.slice(0, index).concat(prevTags.slice(index + 1));
      return updatedTags;
    });
  }

  return (
    <div className={styles.container}>
      <label htmlFor="tags">태그</label>
      <div className={styles.contentBlock}>
        <div className={styles.tagBlock}>
          {tags.map((item, index) => (
            <span key={item} className={styles.tagitem}>
              <Tag tagName={item} />
              <button className={styles.deleteButton} type="button" onClick={() => handleDelete(index)}>
                <img className={styles.deleteImage} src={CloseIcon} alt="태그 삭제 아이콘" />
              </button>
            </span>
          ))}
        </div>

        <div className={styles.inputBlock}>
          <input
            className={styles.contentInput}
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyDown={onKeyPress}
            placeholder="입력 후 Enter"
          />
          {errorMessage ? <p className={styles.error}>이미 추가된 태그입니다.</p> : null}
        </div>
      </div>
    </div>
  );
}

export default InputTag;
