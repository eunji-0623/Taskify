import styles from './Table.module.scss';

function TableBody() {
  return (
    <tr className={styles.body}>
      <td>프로덕트 디자인</td>
      <td>손동희</td>
      <td>수락/거절 버튼</td>
    </tr>
  );
}

export default TableBody;
