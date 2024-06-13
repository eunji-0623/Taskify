import ManagerDropdown from '../ManagerDropdown/ManagerDropdown';
import styles from './NewDropdownManagement.module.scss';

interface Member {
  id: number;
  userId: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
  isOwner: boolean;
}

interface ModalProps {
  manager: string | null;
  setManager: React.Dispatch<React.SetStateAction<string>>;
  managerImg: string | undefined
  setManagerImg: React.Dispatch<React.SetStateAction<string | undefined>>
  members: Member[];
}

function NewDropdownManagement({
  manager,
  setManager,
  members,
  managerImg,
  setManagerImg,
}: ModalProps) {
  return (
    <div className={styles.contentDropdown}>
      <div className={styles.contentBlock}>
        <h3>담당자</h3>
        <ManagerDropdown
          value={manager}
          setValue={setManager}
          members={members}
          profile={managerImg}
          setProfile={setManagerImg}
        />
      </div>
    </div>
  );
}

export default NewDropdownManagement;
