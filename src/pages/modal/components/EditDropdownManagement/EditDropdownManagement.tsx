import DropdownMenu from '../DropdownMenu/DropdownMenu';
import EditManagerDropdown from '../EditManagerDropdown/EditManagerDropdown';
import styles from './EditDropdownManagement.module.scss';

/*
  할 일 수정 모달의 상태와 담당자 드롭다운 메뉴를 관리합니다.
*/

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
  cardState: string;
  setCardState: React.Dispatch<React.SetStateAction<string>>;
  manager: string | undefined;
  setManager: React.Dispatch<React.SetStateAction<string | undefined>>
  managerImg: string | undefined;
  setManagerImg: React.Dispatch<React.SetStateAction<string | undefined>>;
  members: Member[];
  columnList: string[];
  columnListId: number[];
  setColumnId: React.Dispatch<React.SetStateAction<number>>;
  memberIdList: number[];
  setClickManagerId: React.Dispatch<React.SetStateAction<number>>;
}

function EditDropdownManagement({
  cardState,
  setCardState = () => {},
  columnList,
  manager,
  setManager,
  members,
  managerImg,
  setManagerImg,
  columnListId,
  setColumnId,
  memberIdList,
  setClickManagerId,
}: ModalProps) {
  return (
    <div className={styles.contentDropdown}>
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
      <div className={styles.contentBlock}>
        <h3>담당자</h3>
        <EditManagerDropdown
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

export default EditDropdownManagement;
