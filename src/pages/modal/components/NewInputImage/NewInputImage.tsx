import { useRef, useEffect, ChangeEvent } from 'react';
import styles from './NewInputImage.module.scss';
import AddIcon from '/icon/add_image_box.svg';
// import { apiUploadCardImage } from '../../../../api/apiModule';

interface InputImageProps {
  imageUrl: string | null;
  setImageUrl: React.Dispatch<React.SetStateAction<string | null>>;
  // columnId: number;
}

function NewInputImage({
  imageUrl,
  setImageUrl,
  // columnId,
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

  const ImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      const uploadFile = files[0];
      const reader = new FileReader();
      reader.readAsDataURL(uploadFile);
      reader.onloadend = async () => {
        // if (reader.result) {
        //   const imageUrl = reader.result.toString();
        //   setImageUrl(imageUrl);
        //   await testUpload();
        // }
      };
    }
  };

  // const testUpload = async () => {
  //   if (imageUrl !== AddIcon) {
  //     try {
  //       await apiUploadCardImage(imageUrl, columnId);
  //     } catch (error) {
  //       throw new Error('error');
  //     }
  //   }
  // };

  return (
    <div className={styles.contentBlock}>
      <button className={styles.imageBlock} onClick={onClickImage} type="button">
        <img className={styles.contentImageBasic} src={imageUrl === null ? AddIcon : imageUrl} alt="img" />
      </button>
      <label htmlFor="image" style={{ display: 'none' }}>이미지</label>
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

export default NewInputImage;
