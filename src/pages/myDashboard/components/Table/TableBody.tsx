import styles from './Table.module.scss';

function TableBody() {
  return (
    <tbody className={styles.body}>
      <tr>
        <td>프로덕트 디자인</td>
        <td>손동희</td>
        <td>수락/거절 버튼</td>
      </tr>
      <tr>
        <td>새로운 기획 문서</td>
        <td>안귀영</td>
        <td>수락/거절 버튼</td>
      </tr>
      <tr>
        <td>유닛 A</td>
        <td>장혁</td>
        <td>수락/거절 버튼</td>
      </tr>
    </tbody>
  );
}

export default TableBody;
