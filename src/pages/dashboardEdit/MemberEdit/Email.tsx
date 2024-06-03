import styles from './MemberEdit.module.scss';

/*  각각의 이메일 정보입니다
    이메일, 취소 버튼으로 구성되어 있습니다 */

function Email() {
  return (
    <tr className={styles.table_row}>
      <td className={styles.email}>testID@codeit.com</td>
      <td className={styles.removeButton}>
        <button type="button">취소</button>
      </td>
    </tr>
  );
}

export default Email;
