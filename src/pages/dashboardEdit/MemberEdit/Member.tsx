import { DeleteBtn } from '../../../components/Btn/Btn';
import styles from './MemberEdit.module.scss';

/*  각각의 멤버 정보입니다
    프로필 이미지, 이름, 삭제버튼으로 구성되어 있습니다 */

interface Props {
  profile: string;
  name: string;
}

function Member({ name, profile }: Props) {
  const handleDeleteButton = () => [];

  return (
    <tr className={styles.table_row}>
      <td className={styles.profile}>
        <img src={profile} alt="프로필" />
      </td>
      <td className={styles.name}>{name}</td>
      <td className={styles.removeButton}>
        <DeleteBtn BtnText="삭제" handleBtn={handleDeleteButton} />
      </td>
    </tr>
  );
}

export default Member;
