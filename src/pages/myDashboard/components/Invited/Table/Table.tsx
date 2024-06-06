import TableBody from './TableBody';
import TableHeader from './TableHeader';
import styles from './Table.module.scss';
// import TableMobile from './TableMobile';

interface Invitation {
  id: number;
  inviter: {
    nickname: string;
  };
  dashboard: {
    title: string;
  };
}

interface TableProps {
  invitations: Invitation[];
  hasNext: boolean;
  setElement: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}

function Table({ invitations, hasNext, setElement }: TableProps) {
  return (
    <table className={styles.table}>
      <TableHeader />
      <tbody>
        {invitations.map((invitation) => (
          <TableBody
            key={invitation.id}
            title={invitation.dashboard.title}
            name={invitation.inviter.nickname}
          />
        ))}
        {hasNext && <tr ref={setElement} style={{ height: '20px' }} />}
      </tbody>
    </table>
  );
}

export default Table;
