import { useState } from 'react';
import styles from './ModalDropdown.module.scss';

/*
  모달 드롭다운 메뉴바
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

function ModalDropdown({
  value,
  setValue,
  data,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (choice: string) => {
    setValue(choice);
    setIsOpen(false);
  };

  return (
    <div className={styles.container}>
      <button
        type="button"
        className={styles.dropdownBlock}
        onClick={toggleDropdown}
      >
        <ul>{value}</ul>
        {/* <img src={isOpen ? ARROW_UP : ARROW_DOWN} alt="화살표 이미지" /> */}
      </button>

      <div>
        {isOpen && (
          <ul className={styles.items}>
            {data.map((item) => (
              <li key={item.id}>
                <button
                  className={styles.item}
                  type="button"
                  onClick={() => handleItemClick(item.text)}
                >
                  {item.text}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ModalDropdown;
