import { ChangeEvent, useRef, useEffect } from 'react';
import styles from './InputImage.module.scss';
import PencilIcon from '/icon/pencil.svg';
import AddIcon from '/icon/add_image_box.svg';

interface InputImageProps {
  imageUrl: string | ArrayBuffer | null;
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
  text: string;
}

function InputImage({
  imageUrl,
  setImageUrl,
  text,
}: InputImageProps) {
  const uploadImageRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (imageUrl === null) {
      setImageUrl(AddIcon);
    }
  }, [imageUrl, setImageUrl]);

  const onClickImage = () => {
    if (uploadImageRef.current) {
      uploadImageRef.current.click();
    }
  };

  // URL 변경
  const ImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      const uploadFile = files[0];
      const reader = new FileReader();
      reader.readAsDataURL(uploadFile);
      reader.onloadend = () => {
        if (reader.result) {
          setImageUrl(reader.result);
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
              src={typeof imageUrl === 'string' ? imageUrl : ''}
              alt="img"
            />
            <img
              className={styles.pencilIcon}
              src={PencilIcon}
              alt="img"
            />
          </>
        ) : (
          <img className={styles.contentImageBasic} src={typeof imageUrl === 'string' ? imageUrl : ''} alt="img" />
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
