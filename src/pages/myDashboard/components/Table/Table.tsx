import TableBody from './TableBody';
import TableHeader from './TableHeader';
import styles from './Table.module.scss';

function Table() {
  return (
    <table className={styles.table}>
      <TableHeader />
      <TableBody />
    </table>
  );
}

export default Table;
