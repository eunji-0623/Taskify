import { useRef, ChangeEvent } from 'react';
import styles from './NewInputImage.module.scss';
import AddImageIcon from '/icon/add_image_box.svg';
import { apiUploadCardImage } from '../../../../api/apiModule';

/*
  할 일 생성 모달에서 이미지를 첨부할 때 apiUploadCardImage로 카드 이미지를 업로드합니다.
*/

interface InputImageProps {
  imageUrl: string | undefined;
  setImageUrl: React.Dispatch<React.SetStateAction<string | undefined>>;
  columnId: number;
}

function NewInputImage({
  imageUrl,
  setImageUrl,
  columnId,
}: InputImageProps) {
  const uploadImageRef = useRef<HTMLInputElement>(null);

  // useEffect(() => {
  //   if (!imageUrl) {
  //     setImageUrl(AddImageIcon);
  //   }
  // }, [imageUrl, setImageUrl]);

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
      <button className={styles.imageBlock} onClick={onClickImage} type="button">
        {imageUrl === undefined
          ? <img className={styles.contentImageBasic} src={AddImageIcon} alt="img" />
          : <img className={styles.contentImageBasic} src={imageUrl} alt="img" />}
      </button>
      <label htmlFor="image" style={{ display: 'none' }}>이미지</label>
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

export default NewInputImage;
