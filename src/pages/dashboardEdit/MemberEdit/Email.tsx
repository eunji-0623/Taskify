import { DeleteBtn } from '../../../components/Btn/Btn';
import styles from './MemberEdit.module.scss';

/*  각각의 이메일 정보입니다
    이메일, 취소 버튼으로 구성되어 있습니다 */

interface Props {
  email: string;
}

function Email({ email }: Props) {
  const handleCancelButton = () => {};

  return (
    <tr className={styles.table_row}>
      <td className={styles.email}>{email}</td>
      <td className={styles.removeButton} aria-label="취소 버튼">
        <DeleteBtn BtnText="취소" handleBtn={handleCancelButton} />
      </td>
    </tr>
  );
}

export default Email;
