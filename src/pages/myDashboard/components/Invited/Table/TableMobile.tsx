import styles from './Table.module.scss';
import { AcceptAndRejectBtn } from '../../../../../components/Btn/Btn';

interface Props {
  title: string;
  name: string;
}

function TableMobile({ title, name }: Props) {
  const handleAcceptButton = () => {};
  const handleRejectButton = () => {};

  return (
    <>
      <tr style={{ height: '20px' }} />
      {' '}
      {/* 간격을 위한 빈 행 */}
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
            handleAccept={handleAcceptButton}
            handleReject={handleRejectButton}
          />
        </td>
      </tr>
      <tr style={{ height: '20px', borderBottom: '1px solid #EEE' }} />
      {' '}
      {/* 간격을 위한 빈 행 */}
    </>
  );
}

export default TableMobile;
