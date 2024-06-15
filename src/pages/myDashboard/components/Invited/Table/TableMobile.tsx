import styles from './Table.module.scss';
import { AcceptAndRejectBtn } from '../../../../../components/Btn/Btn';

interface Props {
  id: number;
  inviterId: number;
  dashboardId: number;
  title: string;
  name: string;
  handleInvitation: (
    id: number,
    inviterId: number,
    dashboardId: number,
    title: string,
    isAccept: boolean
  ) => void;
}

function TableMobile({
  id,
  inviterId,
  dashboardId,
  title,
  name,
  handleInvitation,
}: Props) {
  const handleAcceptClick = () => {
    handleInvitation(id, inviterId, dashboardId, title, true);
  };

  const handleRejectClick = () => {
    handleInvitation(id, inviterId, dashboardId, title, false);
  };

  return (
    <>
      <tr style={{ height: '20px' }} />
      <tr>
        <td className={styles.head}>이름</td>
        <td>{title}</td>
      </tr>
      <tr>
        <td className={styles.head}>초대자</td>
        <td>{name}</td>
      </tr>
      <tr>
        <td colSpan={2} aria-label="수락 거절 버튼">
          <AcceptAndRejectBtn
            handleAccept={handleAcceptClick}
            handleReject={handleRejectClick}
          />
        </td>
      </tr>
      <tr style={{ height: '20px', borderBottom: '1px solid #EEE' }} />
    </>
  );
}

export default TableMobile;
