import styles from './MemberEdit.module.scss';

/*  각각의 멤버 정보입니다
    프로필 이미지, 이름, 삭제버튼으로 구성되어 있습니다 */

function Member() {
  return (
    <tr className={styles.table_row}>
      <td className={styles.profile}>프로필</td>
      <td className={styles.name}>정민철</td>
      <td className={styles.removeButton}>
        <button type="button">삭제</button>
      </td>
    </tr>
  );
}

export default Member;
