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
        {invitations.map((invitation, index) => (
          <TableBody
            key={`${invitation.id}-${index}`}
            title={invitation.dashboard.title}
            name={invitation.inviter.nickname}
          />
        ))}
        {hasNext && <div ref={setElement} style={{ height: '20px' }}></div>}
      </tbody>
    </table>
  );
}

export default Table;
