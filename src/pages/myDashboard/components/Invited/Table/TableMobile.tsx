import styles from './Table.module.scss';
import { AcceptAndRejectBtn } from '../../../../../components/Btn/Btn';
import { apiInvitationAccept } from '../../../../../api/apiModule';

interface Props {
  id: number;
  title: string;
  name: string;
}

function TableMobile({ id, title, name }: Props) {
  const handleAccept = async () => {
    await apiInvitationAccept({ invitationId: id }, { inviteAccepted: true });
  };

  const handleReject = async () => {
    await apiInvitationAccept({ invitationId: id }, { inviteAccepted: false });
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
            handleAccept={handleAccept}
            handleReject={handleReject}
          />
        </td>
      </tr>
      <tr style={{ height: '20px', borderBottom: '1px solid #EEE' }} />
    </>
  );
}

export default TableMobile;
