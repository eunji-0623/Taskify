import Search from '../Search/Search';
import Table from '../Table/Table';
import styles from './Invited.module.scss';

function Invited() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>초대받은 대시보드</h2>
      <Search />
      <Table />
    </div>
  );
}

export default Invited;
