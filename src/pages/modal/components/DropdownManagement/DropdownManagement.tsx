import DropdownMenu from '../DropdownMenu/DropdownMenu';
import ManagerDropdown from '../ManagerDropdown/ManagerDropdown';
import styles from './DropdownManagement.module.scss';

/*
  할 일 모달에 드롭다운 박스입니다.
*/

interface ModalProps {
  cardState: string;
  setCardState: React.Dispatch<React.SetStateAction<string>>;
  manager: string;
  setManager: React.Dispatch<React.SetStateAction<string>>;
  data: {
    id: number;
    text: string;
    profile: string | undefined
  }[];
  managerImg: string | undefined
  setManagerImg: React.Dispatch<React.SetStateAction<string | undefined>>;
  text: string;
}

function DropdownManagement({
  cardState = '',
  setCardState = () => {},
  manager,
  setManager,
  data,
  managerImg,
  setManagerImg,
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
            data={data}
          />
        </div>
      ) : null}
      <div className={styles.contentBlock}>
        <h3>담당자</h3>
        <ManagerDropdown
          value={manager}
          setValue={setManager}
          data={data}
          profile={managerImg}
          setProfile={setManagerImg}
        />
      </div>
    </div>
  );
}

export default DropdownManagement;
