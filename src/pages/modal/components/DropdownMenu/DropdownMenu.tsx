import { useEffect, useState, useRef } from 'react';
import ProgressState from '../../../../components/chip/ProgressState/ProgressState';
import styles from './DropdownMenu.module.scss';
import ArrowDropDown from '/icon/arrow_drop_down.svg';
import checked from '/icon/checked_gray.svg';

/*
  상태 드롭다운 메뉴바입니다.
  value, setValue, data를 prop로 받습니다.
*/

interface DropdownProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  data: {
    id: number;
    text: string;
  }[];
}

function DropdownMenu({
  value,
  setValue,
  data,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // 영역 밖 클릭 시 닫기
  useEffect(() => {
    const handleModal = (event: MouseEvent) => {
      if (isOpen && !modalRef.current?.contains?.(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleModal);

    return () => {
      document.removeEventListener('mousedown', handleModal);
    };
  }, [isOpen, setIsOpen, modalRef]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (choice: string) => {
    setValue(choice);
    setIsOpen(false);
  };

  return (
    <div className={styles.container} ref={modalRef}>
      <button
        type="button"
        className={styles.dropdownButton}
        onClick={toggleDropdown}
      >
        <ProgressState content={value} />
        <img src={ArrowDropDown} alt="드롭다운" />
      </button>

      <div className={styles.dropdownBlock}>
        {isOpen && (
          <ul className={styles.items}>
            {data.map((item) => (
              <li key={item.id}>
                <button
                  className={styles.itemBlock}
                  type="button"
                  style={{ borderRadius: '0.375rem' }}
                  onClick={() => handleItemClick(item.text)}
                >
                  {value === item.text && (
                    <img className={styles.checkedImg} src={checked} alt="체크 아이콘" />
                  )}
                  <div className={styles.item}>
                    <ProgressState content={item.text} />
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default DropdownMenu;
