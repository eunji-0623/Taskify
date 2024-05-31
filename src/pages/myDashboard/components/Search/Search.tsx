import styles from './Search.module.scss';

function Search() {
  return (
    <div className={styles.container}>
      <img src="/icon/search.svg" alt="돋보기 아이콘" />
      <input className={styles.searchInput} placeholder="검색"></input>
    </div>
  );
}

export default Search;
