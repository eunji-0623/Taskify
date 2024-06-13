import DropdownMenu from '../DropdownMenu/DropdownMenu';
import ManagerDropdown from '../ManagerDropdown/ManagerDropdown';
import styles from './DropdownManagement.module.scss';

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
  cardState?: string;
  setCardState?: React.Dispatch<React.SetStateAction<string>>;
  manager: string | null;
  setManager: React.Dispatch<React.SetStateAction<string>>;
  managerImg: string | null;
  setManagerImg: React.Dispatch<React.SetStateAction<string | null>>;
  members: Member[];
  text: string;
  columnList?: string[];
  columnListId?: number[];
  setColumnId?: React.Dispatch<React.SetStateAction<number | null>>;
}

function DropdownManagement({
  cardState = '',
  setCardState = () => {},
  columnList,
  manager,
  setManager,
  members,
  managerImg,
  setManagerImg,
  columnListId,
  setColumnId,
  text,
}: ModalProps) {
  return (
    <div className={styles.contentDropdown}>
      {text !== 'new' ? (
        <div className={styles.contentBlock}>
          <h3>상태</h3>
          <DropdownMenu
            value={cardState}
            setValue={setCardState}
            columnList={columnList}
            columnListId={columnListId}
            setColumnId={setColumnId}
          />
        </div>
      ) : null}
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

export default DropdownManagement;
