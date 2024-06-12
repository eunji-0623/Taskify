import { AcceptAndRejectBtn } from '../../../../../components/Btn/Btn';
import styles from './Table.module.scss';

/* Table의 각 요소들입니다. */

interface Props {
  id: number;
  title: string;
  name: string;
  handleInvitation: (id: number, isAccept: boolean) => void;
}

function TableBody({
  id, title, name, handleInvitation,
}: Props) {
  const handleAcceptClick = () => {
    handleInvitation(id, true);
  };

  const handleRejectClick = () => {
    handleInvitation(id, false);
  };

  return (
    <tr className={styles.body}>
      <td className={styles.title}>{title}</td>
      <td className={styles.name}>{name}</td>
      <td className={styles.button} aria-label="수락 거절 버튼">
        <AcceptAndRejectBtn
          handleAccept={handleAcceptClick}
          handleReject={handleRejectClick}
        />
      </td>
    </tr>
  );
}

export default TableBody;
