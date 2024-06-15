import { apiDeleteMemeber } from '../../../api/apiModule';
import { DeleteBtn } from '../../../components/Btn/Btn';
import styles from './MemberEdit.module.scss';

/*  각각의 멤버 정보입니다
    프로필 이미지, 이름, 삭제버튼으로 구성되어 있습니다 */

interface Props {
  memberId: number;
  profile: string;
  name: string;
  isOwner: boolean;
  handleReload: () => void;
}

function Member({ memberId, name, profile, isOwner, handleReload }: Props) {
  const handleDeleteButton = async () => {
    await apiDeleteMemeber({ memberId });
    handleReload();
  };

  return (
    <tr className={styles.table_row}>
      <td className={styles.profile}>
        <img className={styles.profileImage} src={profile} alt="프로필" />
      </td>
      <td className={styles.name}>
        {name} {isOwner ? <img src="/icon/crown.svg" alt="왕관" /> : null}
      </td>
      <td className={styles.removeButton}>
        {!isOwner ? (
          <DeleteBtn BtnText="삭제" handleBtn={handleDeleteButton} />
        ) : null}
      </td>
    </tr>
  );
}

export default Member;
