import { AcceptAndRejectBtn } from '../../../../../components/Btn/Btn';
import styles from './Table.module.scss';

/* Table의 각 요소들입니다. */

interface Props {
  title: string;
  name: string;
}

function TableBody({ title, name }: Props) {
  // 수락, 거절 기능 추가 필요
  const handleAccept = () => {};
  const handdleReject = () => {};

  return (
    <tr className={styles.body}>
      <td className={styles.title}>{title}</td>
      <td className={styles.name}>{name}</td>
      <td className={styles.button} aria-label="수락 거절 버튼">
        <AcceptAndRejectBtn
          handleAccept={handleAccept}
          handleReject={handdleReject}
        />
      </td>
    </tr>
  );
}

export default TableBody;
