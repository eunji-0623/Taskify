import TableBody from './TableBody';
import TableHeader from './TableHeader';
import styles from './Table.module.scss';
import TableMobile from './TableMobile';

function Table() {
  return (
    <table className={styles.table}>
      <TableHeader />
      <tbody>
        <TableBody />
        <TableBody />
        <TableBody />
      </tbody>
    </table>
  );
}

export default Table;
