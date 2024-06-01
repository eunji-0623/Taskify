import styles from './Table.module.scss';

function TableMobile() {
  return (
    <>
      <tr>
        <td className={styles.head}>이름</td>
        <td>프로덕트 디자인</td>
      </tr>
      <tr>
        <td className={styles.head}>초대자</td>
        <td>손동희</td>
      </tr>
      <tr>
        <td>수락/거절</td>
      </tr>
    </>
  );
}

export default TableMobile;
