import { useRef } from 'react';
import styles from './ImageButton.module.scss';
import PlusImage from '../../../../../public/icon/add_blue.svg';

interface ImageButtonProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function ImageButton({ onChange }: ImageButtonProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // 버튼 클릭 이벤트 핸들러
  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // 파일 입력 요소를 클릭하도록 트리거
    }
  };

  return (
    <div>
      <button
        className={styles.imageAddButton}
        type="button"
        onClick={handleClick}
      >
        <img
          className={styles.plusImage}
          src={PlusImage}
          alt="플러스 모양 이미지"
        />
      </button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }} // 입력 요소 숨기기
        accept="image/*" // 이미지 파일만 허용
        onChange={onChange} // 파일이 선택되면 onChange 호출
      />
    </div>
  );
}

export default ImageButton;
