// NewDropdownManagement.tsx

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
  manager: string;
  setManager: React.Dispatch<React.SetStateAction<string | undefined>>;
  managerImg: string | undefined;
  setManagerImg: React.Dispatch<React.SetStateAction<string | undefined>>;
  members: Member[];
  memberIdList: number[];
  setClickManagerId: React.Dispatch<React.SetStateAction<number>>;
}

function NewDropdownManagement({
  manager,
  setManager,
  members,
  managerImg,
  setManagerImg,
  memberIdList,
  setClickManagerId,
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
          memberIdList={memberIdList}
          setClickManagerId={setClickManagerId}
        />
      </div>
    </div>
  );
}

export default NewDropdownManagement;
