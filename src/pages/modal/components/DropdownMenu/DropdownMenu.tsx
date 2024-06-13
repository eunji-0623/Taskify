import { useEffect, useState, useRef } from 'react';
import ProgressState from '../../../../components/chip/ProgressState/ProgressState';
import styles from './DropdownMenu.module.scss';
import ArrowDropDown from '/icon/arrow_drop_down.svg';
import checked from '/icon/checked_gray.svg';

interface DropdownProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  columnList: Array<string>;
  columnListId: Array<number>;
  setColumnId: React.Dispatch<React.SetStateAction<number>>;
}

function DropdownMenu({
  value,
  setValue,
  columnList,
  columnListId,
  setColumnId,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

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

  const handleItemClick = (choice: string, index: number) => {
    setValue(choice);
    setColumnId(columnListId[index]);
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
            {columnList.map((item, index) => (
              <li key={item}>
                <button
                  className={styles.itemBlock}
                  type="button"
                  style={{ borderRadius: '0.375rem' }}
                  onClick={() => handleItemClick(item, index)}
                >
                  {value === item && (
                    <img className={styles.checkedImg} src={checked} alt="체크 아이콘" />
                  )}
                  <div className={styles.item}>
                    <ProgressState content={item} />
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
