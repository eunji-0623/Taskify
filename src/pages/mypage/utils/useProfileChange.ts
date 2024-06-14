import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import { apiEditMyInfo, apiUploadImage } from '../../../api/apiModule';

// 닉네임과 프로필을 변경하는 함수입니다.
// 기존 값을 먼저 보여주며, 변경하고 변경 버튼을 누르면 닉네임이 변경됩니다.
// ProfileEdit 컴포넌트에서 사용됩니다.

function useProfileChange() {
  // user 정보 받아오기, UserContext가 null일 수 있으므로 이를 안전하게 처리
  const userContext = useContext(UserContext);
  const userInfo = userContext?.userInfo;

  // 모달 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  // 모달 창 닫는 함수
  const closeModal = () => {
    setIsModalOpen(false);
    setIsErrorModalOpen(false);
  };

  // 변경 성공 시 모달을 닫으면 자동으로 페이지 새로고침
  const closeSuccessModalAndReload = () => {
    setIsModalOpen(false);
    window.location.reload();
  };

  // user 상태 관리
  const [nickname, setNickname] = useState('');
  const [profileImage, setProfileImage] = useState<File | null>(null);

  // userInfo가 변경될 때 닉네임 상태를 업데이트
  useEffect(() => {
    if (userInfo) {
      setNickname(userInfo.nickname);
    }
  }, [userInfo]);

  // 닉네임 Input 값 변경 처리 함수
  const handleNicknameChange = (e: { target: { value: string } }) => {
    setNickname(e.target.value);
  };

  // 프로필 이미지 값 변경 처리 함수
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  // 변경 버튼 클릭 시 처리 함수
  const handleUpdateClick = async () => {
    if (userContext && userContext.setUserInfo && userInfo) {
      try {
        let profileImageUrl = '';

        // 프로필 이미지 업로드

        if (profileImage) {
          const base64Image = await fileToBase64(profileImage);
          const uploadImageResponse = await apiUploadImage({
            image: base64Image,
          });
          profileImageUrl = uploadImageResponse.profileImageUrl;
        }

        // user 정보 업데이트
        const updateData = {
          nickname,
          profileImageUrl,
        };

        const response = await apiEditMyInfo(updateData);

        // userInfo 업데이트
        userContext.setUserInfo(response);
        setIsModalOpen(true);
      } catch (error) {
        setIsErrorModalOpen(true);
      }
    }
  };

  return {
    nickname,
    profileImage,
    isModalOpen,
    isErrorModalOpen,
    closeModal,
    setIsModalOpen,
    setIsErrorModalOpen,
    closeSuccessModalAndReload,
    handleNicknameChange,
    handleImageChange,
    handleUpdateClick,
  };
}

export default useProfileChange;

// base64로 변환하는 함수
async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result); // 전체 Base64 문자열 반환
      } else {
        reject(new Error('base64로 변환에 실패했습니다.'));
      }
    };
    reader.onerror = (error) => reject(error);
  });
}
