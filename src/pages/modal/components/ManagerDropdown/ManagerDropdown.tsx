import { useEffect, useState, useRef } from 'react';
import styles from './ManagerDropdown.module.scss';
import ArrowDropDown from '/icon/arrow_drop_down.svg';
import checked from '/icon/checked_gray.svg';
import { UserProfileImgSvg } from '../../../../components/UserProfileImg/UserProfileImg';

/*
  관리자를 드롭다운 메뉴로 볼 수 있습니다.
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

interface DropdownProps {
  value: string | undefined
  setValue: React.Dispatch<React.SetStateAction<string>>;
  profile: string | undefined;
  setProfile: React.Dispatch<React.SetStateAction<string | undefined>>;
  members: Member[];
  memberIdList: number[];
  setClickManagerId: React.Dispatch<React.SetStateAction<number>>;
}

function ManagerDropdown({
  value,
  setValue,
  members,
  profile,
  setProfile,
  memberIdList,
  setClickManagerId,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
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

  // 메뉴 중 클릭한 경우
  const handleItemClick = (nickname: string, profileImageUrl: string, index: number) => {
    setValue(nickname);
    setIsOpen(false);
    setProfile(profileImageUrl);
    setClickManagerId(memberIdList[index]);
    // setSearchTerm(nickname);
  };

  // 검색 기능
  // const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setValue(e.target.value);
  // };

  // const filteredData = members.filter((member) => member.nickname
  //   && searchTerm
  //   && member.nickname.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className={styles.container} ref={modalRef}>
      <button className={styles.searchBlock} onClick={toggleDropdown} type="button">
        <div className={styles.searchCenter}>
          {
            // profile ? (
            //   <UserProfileImgSvg
            //     profileImageUrl={profile}
            //   />
            // ) : (
            //   <UserProfileImg
            //     isImg={false}
            //     profileImageUrl=""
            //     nickname={value}
            //   />
            // )
            profile && <UserProfileImgSvg profileImageUrl={profile} />
          }
          <input
            className={styles.searchInput}
            type="text"
            placeholder="이름을 입력해 주세요"
            value={value ?? ''}
            onClick={toggleDropdown}
            // onChange={handleSearchChange}
            readOnly
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
              {members.map((member, index) => (
                <li key={member.id}>
                  <button
                    className={styles.itemBlock}
                    type="button"
                    onClick={() => handleItemClick(member.nickname, member.profileImageUrl, index)}
                  >
                    {value === member.nickname && (
                      <img
                        className={styles.checkedImg}
                        src={checked}
                        alt="체크 아이콘"
                      />
                    )}
                    <div className={styles.item}>
                      {
                        // profile ? (
                        //   <UserProfileImgSvg
                        //     profileImageUrl={member.profileImageUrl}
                        //   />
                        // ) : (
                        //   <UserProfileImg
                        //     isImg={false}
                        //     profileImageUrl=""
                        //     nickname={member.nickname}
                        //   />
                        // )
                        profile && <UserProfileImgSvg profileImageUrl={profile} />
                      }
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
