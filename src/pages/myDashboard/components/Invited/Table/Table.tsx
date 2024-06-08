import TableBody from './TableBody';
import TableHeader from './TableHeader';
import styles from './Table.module.scss';
import TableMobile from './TableMobile';
import useWindowSize from '../../../../../utils/useWindowSize';

/*  Invited 컴포넌트에서 받아온 데이터로 테이블을 그립니다  */

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
  const { width } = useWindowSize();

  return (
    <table className={styles.table}>
      {width >= 768 ? (
        <>
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
        </>
      ) : (
        <tbody>
          {invitations.map((invitation) => (
            <TableMobile
              key={invitation.id}
              title={invitation.dashboard.title}
              name={invitation.inviter.nickname}
            />
          ))}
          {hasNext && <tr ref={setElement} style={{ height: '50px' }} />}
        </tbody>
      )}
    </table>
  );
}

export default Table;
