import { useRef } from 'react';
import styles from './ImageButton.module.scss';
import PlusImage from '../../../../../public/icon/add_blue.svg';

// 설정된 이미지를 보여주는 컴포넌트 입니다.
// 설정된 이미지가 없으면 기본 이미지 추가 버튼이 보여집니다.
// 이미지를 변경할 경우 변경한 이미지가 보여집니다.

interface ImageButtonProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  currentImageUrl: string | null;
}

function ImageButton({ onChange, currentImageUrl }: ImageButtonProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // 버튼 클릭 이벤트 핸들러
  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // 파일 입력 요소를 클릭하도록 트리거
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick();
    }
  };

  return (
    <div className={styles.imageButtonContainer}>
      {currentImageUrl ? (
        <div
          role="button"
          tabIndex={0}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          className={styles.profileImageWrapper}
        >
          <img
            src={currentImageUrl}
            alt="프로필 이미지"
            className={styles.profileImage}
          />
        </div>
      ) : (
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
      )}
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
