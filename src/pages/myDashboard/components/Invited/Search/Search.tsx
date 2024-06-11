import styles from './Search.module.scss';

/* 대시보드 검색을 위한 input */

interface Props {
  searchingWord: (searchWord: string) => void;
}

function Search({ searchingWord }: Props) {
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    searchingWord(event.target.value);
  };

  return (
    <div className={styles.container}>
      <img src="/icon/search.svg" alt="돋보기 아이콘" />
      <input
        className={styles.searchInput}
        placeholder="검색"
        onChange={handleOnChange}
      />
    </div>
  );
}

export default Search;
