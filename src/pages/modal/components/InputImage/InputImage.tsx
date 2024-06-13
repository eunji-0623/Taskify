import { ChangeEvent, useRef, useEffect } from 'react';
import styles from './InputImage.module.scss';
import PencilIcon from '/icon/pencil.svg';
import AddIcon from '/icon/add_image_box.svg';

interface InputImageProps {
  imageUrl: string | ArrayBuffer | null;
  setImageUrl: (url: string) => void;
  text: string;
}

function InputImage({
  imageUrl,
  setImageUrl,
  text,
}: InputImageProps) {
  const uploadImageRef = useRef<HTMLInputElement>(null);

  console.log(imageUrl);

  useEffect(() => {
    if (!imageUrl) {
      setImageUrl(AddIcon);
    }
  }, [imageUrl, setImageUrl]);

  const onClickImage = () => {
    if (uploadImageRef.current) {
      uploadImageRef.current.click();
    }
  };

  // Base64 인코딩된 데이터 URL로 변환
  const ImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      const uploadFile = files[0];
      const reader = new FileReader();
      reader.readAsDataURL(uploadFile);
      reader.onloadend = () => {
        if (reader.result) {
          setImageUrl(reader.result.toString());
        }
      };
    }
  };

  return (
    <div className={styles.contentBlock}>
      <label htmlFor="image">이미지</label>
      <button className={styles.imageBlock} onClick={onClickImage} type="button">
        {text !== 'new' ? (
          <>
            <img
              className={styles.contentImage}
              src={imageUrl as string}
              alt="img"
            />
            <img
              className={styles.pencilIcon}
              src={PencilIcon}
              alt="img"
            />
          </>
        ) : (
          <img className={styles.contentImageBasic} src={imageUrl as string} alt="img" />
        )}
      </button>

      <input
        id="image"
        name="image"
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        ref={uploadImageRef}
        onChange={ImageUpload}
      />
    </div>
  );
}

export default InputImage;
