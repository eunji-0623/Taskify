import styles from './NameEdit.module.scss';

/*  대시보드 수정 페이지 중
    이름과 색상을 바꾸기 위한 부분입니다.  */

function Info() {
  return (
    <div className={styles.container}>
      <div className={styles.present}>
        <h3 className={styles.name}>현재 대시보드 이름</h3>
        <div className={styles.chips}>
          <button type="button">1</button>
          <button type="button">2</button>
          <button type="button">3</button>
          <button type="button">4</button>
          <button type="button">5</button>
        </div>
      </div>
      <div className={styles.new}>
        <p className={styles.description}>대시보드 이름</p>
        <input
          className={styles.newNameInput}
          placeholder="변경할 이름을 입력해주세요"
        />
        <button className={styles.submitButton} type="button">
          변경
        </button>
      </div>
    </div>
  );
}

export default Info;
