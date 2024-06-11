import { useEffect, useState, useRef } from 'react';
import styles from './ManagerDropdown.module.scss';
import ArrowDropDown from '/icon/arrow_drop_down.svg';
import checked from '/icon/checked_gray.svg';

/*
  관리자 드롭다운 메뉴바
  value, setValue, data를 prop로 받습니다.
*/

interface DropdownProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  data: {
    id: number;
    text: string;
    profile: string | undefined;
  }[]
  profile: string | undefined;
  setProfile: React.Dispatch<React.SetStateAction<string | undefined>>;
}

function ManagerDropdown({
  value,
  setValue,
  data,
  profile,
  setProfile,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(value);
  const modalRef = useRef<HTMLDivElement>(null);

  // 영역 밖 클릭 시 닫기
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

  const handleItemClick = (choice: string, profileImg: string | undefined) => {
    setValue(choice);
    setIsOpen(false);
    setSearchTerm(choice);
    setProfile(profileImg);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = data.filter((item) => item.text.toLowerCase()
    .includes(searchTerm.toLowerCase()));

  return (
    <div className={styles.container} ref={modalRef}>
      <button className={styles.searchBlock} onClick={toggleDropdown} type="button">
        <div className={styles.searchCenter}>
          {value && <img className={styles.profileImg} src={profile} alt="프로필 이미지" />}
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
              {filteredData.map((item) => (
                <li key={item.id}>
                  <button
                    className={styles.itemBlock}
                    type="button"
                    onClick={() => handleItemClick(item.text, item.profile)}
                  >
                    {value === item.text && (
                      <img
                        className={styles.checkedImg}
                        src={checked}
                        alt="체크 아이콘"
                      />
                    )}
                    <div className={styles.item}>
                      <img className={styles.dropdownprofile} src={item.profile} alt={item.text} />
                      {item.text}
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
