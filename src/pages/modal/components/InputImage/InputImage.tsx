import { ChangeEvent, useRef } from 'react';
import styles from './InputImage.module.scss';
import PencilIcon from '/icon/pencil.svg';

interface InputImageProps {
  uploadImgUrl: string;
  setUploadImgUrl: (url: string) => void;
}

function InputImage({
  uploadImgUrl,
  setUploadImgUrl,
}: InputImageProps) {
  const uploadImageRef = useRef<HTMLInputElement>(null);

  const onClickImage = () => {
    if (uploadImageRef.current) {
      uploadImageRef.current.click();
    }
  };

  const onchangeImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files[0]) {
      const uploadFile = files[0];
      const reader = new FileReader();
      reader.readAsDataURL(uploadFile);
      reader.onloadend = () => {
        if (reader.result) {
          setUploadImgUrl(reader.result as string);
        }
      };
    }
  };

  return (
    <div className={styles.contentBlock}>
      <label htmlFor="image">이미지</label>
      <button className={styles.imageBlock} onClick={onClickImage} type="button">
        <img
          className={styles.contentImage}
          src={uploadImgUrl}
          alt="img"
          style={{ filter: 'brightness(50%)' }}
        />
        <img
          className={styles.pencilIcon}
          src={PencilIcon}
          alt="img"
        />
      </button>

      <input
        id="image"
        name="image"
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        ref={uploadImageRef}
        onChange={onchangeImageUpload}
      />
    </div>
  );
}

export default InputImage;
