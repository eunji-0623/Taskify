import styles from './Search.module.scss';

/* 대시보드 검색을 위한 input */

function Search() {
  return (
    <div className={styles.container}>
      <img src="/icon/search.svg" alt="돋보기 아이콘" />
      <input className={styles.searchInput} placeholder="검색"></input>
    </div>
  );
}

export default Search;
