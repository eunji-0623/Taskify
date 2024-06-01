import styles from './Table.module.scss';

function TableHeader() {
  return (
    <thead className={styles.head}>
      <tr>
        <td>이름</td>
        <td>초대자</td>
        <td>수락 여부</td>
      </tr>
    </thead>
  );
}

export default TableHeader;
