import styles from './Table.module.scss';

interface Props {
  title: string;
  name: string;
}

function TableBody({ title, name }: Props) {
  return (
    <tr className={styles.body}>
      <td>{title}</td>
      <td>{name}</td>
      <td>수락/거절 버튼</td>
    </tr>
  );
}

export default TableBody;
