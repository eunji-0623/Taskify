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
    id: number;
  };
  dashboard: {
    title: string;
    id: number;
  };
}

interface TableProps {
  invitations: Invitation[];
  hasNext: boolean;
  setElement: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  handleInvitation: (
    id: number,
    inviterId: number,
    dashboardId: number,
    title: string,
    isAccept: boolean
  ) => void;
}

function Table({
  invitations,
  hasNext,
  setElement,
  handleInvitation,
}: TableProps) {
  const { width } = useWindowSize();

  return (
    <table className={styles.table}>
      {width >= 768 ? (
        <>
          <TableHeader />
          <tbody>
            {[
              ...new Map(
                invitations.map((invitation) => [
                  `${invitation.inviter.id}-${invitation.dashboard.id}`,
                  invitation,
                ])
              ).values(),
            ].map((invitation) => (
              <TableBody
                key={invitation.id}
                id={invitation.id}
                inviterId={invitation.inviter.id}
                dashboardId={invitation.dashboard.id}
                title={invitation.dashboard.title}
                name={invitation.inviter.nickname}
                handleInvitation={handleInvitation}
              />
            ))}
            {hasNext && <tr ref={setElement} style={{ height: '20px' }} />}
          </tbody>
        </>
      ) : (
        <tbody>
          {/* {invitations
            .filter((invitation) => !invitation.inviteAccepted)
            .map((invitation) => (
              <TableMobile
                key={invitation.id}
                id={invitation.id}
                title={invitation.dashboard.title}
                name={invitation.inviter.nickname}
              />
            ))} */}
          {hasNext && <tr ref={setElement} style={{ height: '50px' }} />}
        </tbody>
      )}
    </table>
  );
}

export default Table;
