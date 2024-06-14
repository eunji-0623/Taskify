import { useRef, useEffect, ChangeEvent } from 'react';
import styles from './EditInputImage.module.scss';
import PencilIcon from '/icon/pencil.svg';
import AddIcon from '/icon/add_image_box.svg';
import { apiUploadCardImage } from '../../../../api/apiModule';
// import { apiUploadCardImage } from '../../../../api/apiModule';

interface InputImageProps {
  imageUrl: string | null;
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
  columnId: number;
}

function EditInputImage({
  imageUrl,
  setImageUrl,
  columnId,
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

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      const uploadFile = files[0];
      const formData = new FormData();
      formData.append('image', uploadFile);

      try {
        const response = await apiUploadCardImage(formData, columnId);
        setImageUrl(response.imageUrl);
      } catch (error) {
        throw new Error('error');
      }
    }
  };

  return (
    <div className={styles.contentBlock}>
      <label htmlFor="image">이미지</label>
      <button className={styles.imageBlock} onClick={onClickImage} type="button">
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
      </button>

      <input
        id="image"
        name="image"
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        ref={uploadImageRef}
        onChange={handleImageUpload}
      />
    </div>
  );
}

export default EditInputImage;
