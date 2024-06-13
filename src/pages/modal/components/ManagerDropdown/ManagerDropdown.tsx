import { useEffect, useState, useRef } from 'react';
import styles from './ManagerDropdown.module.scss';
import ArrowDropDown from '/icon/arrow_drop_down.svg';
import checked from '/icon/checked_gray.svg';

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

interface DropdownProps {
  value: string | null;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  profile: string | undefined;
  setProfile: React.Dispatch<React.SetStateAction<string | undefined>>;
  members: Member[];
}

function ManagerDropdown({
  value,
  setValue,
  members,
  profile,
  setProfile,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(value);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleModal = (event: MouseEvent) => {
      if (isOpen && !modalRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleModal);

    return () => {
      document.removeEventListener('mousedown', handleModal);
    };
  }, [isOpen]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (nickname: string, profileImageUrl: string) => {
    setValue(nickname);
    setIsOpen(false);
    setSearchTerm(nickname);
    setProfile(profileImageUrl);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // const filteredData = members.filter((member) => member.nickname
  //   && searchTerm
  //   && member.nickname.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className={styles.container} ref={modalRef}>
      <button className={styles.searchBlock} onClick={toggleDropdown} type="button">
        <div className={styles.searchCenter}>
          <img className={styles.profileImg} src={profile} alt="프로필 이미지" />
          <input
            className={styles.searchInput}
            type="text"
            placeholder="이름을 입력해 주세요"
            value={searchTerm}
            onClick={toggleDropdown}
            onChange={handleSearchChange}
          />
          <img
            className={styles.searchImg}
            src={ArrowDropDown}
            alt="드롭다운 아이콘"
          />
        </div>
      </button>

      {isOpen && (
        <div className={styles.dropdownBlock}>
          <div className={styles.dropdownContent}>
            <ul className={styles.items}>
              {members.map((member) => (
                <li key={member.id}>
                  <button
                    className={styles.itemBlock}
                    type="button"
                    onClick={() => handleItemClick(member.nickname, member.profileImageUrl)}
                  >
                    {value === member.nickname && (
                      <img
                        className={styles.checkedImg}
                        src={checked}
                        alt="체크 아이콘"
                      />
                    )}
                    <div className={styles.item}>
                      <img
                        className={styles.dropdownProfile}
                        src={member.profileImageUrl}
                        alt={member.nickname}
                      />
                      {member.nickname}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManagerDropdown;
