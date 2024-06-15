import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import { apiEditMyInfo, apiUploadImage } from '../../../api/apiModule';
import defaultProfileImg from '../../../../public/img/test_img.png';

// 닉네임과 프로필을 변경하는 함수입니다.
// 닉네임은 기존 값을 먼저 보여주며, 변경하고 변경 버튼을 누르면 닉네임이 변경됩니다.
// 프로필도 설정된 값을 먼저 보여주며, 설정된 값이 없을 경우 추가 버튼이 보입니다.
// 둘 중 하나만 변경하더라도 변경이 가능하도록 구현했습니다.
// 대신 프로필 변경 없이 닉네임만 바꾸려고 할 경우 기본 이미지가 자동으로 적용됩니다.
// 기존 설정된 값이 있을 경우 변경이 없다면 그 값이 유지됩니다.
// 이미지 변경 없이 이름만 변경 -> 기존 이미지 유지, 이름만 변경
// 이름 변경 없이 이미지만 변경 -> 기존 이름은 유지, 이미지만 변경
// ProfileEdit 컴포넌트에서 사용됩니다.

// 타입 정의
interface UpdateData {
  nickname: string;
  profileImageUrl: string;
}

function useProfileChange() {
  // user 정보 받아오기, UserContext가 null일 수 있으므로 이를 안전하게 처리
  const userContext = useContext(UserContext);
  const userInfo = userContext?.userInfo;

  // user 상태 관리
  const [nickname, setNickname] = useState('');
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(
    userInfo?.profileImageUrl || defaultProfileImg,
  );

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

  // userInfo가 변경될 때 닉네임 상태를 업데이트
  useEffect(() => {
    if (userInfo) {
      setNickname(userInfo.nickname);
      setProfileImageUrl(userInfo.profileImageUrl || null);
    }
  }, [userInfo]);

  // 닉네임 Input 값 변경 처리 함수
  const handleNicknameChange = (e: { target: { value: string } }) => {
    setNickname(e.target.value);
  };

  // 프로필 이미지 값 변경 처리 함수
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImage(file);

      // 파일 형식 검사
      const validImageTypes = ['image/jpeg', 'image/png', 'image/svg+xml'];
      if (!validImageTypes.includes(file.type)) {
        alert('Unsupported file type. Only JPEG, PNG, and SVG are allowed.');
        return;
      }

      setProfileImage(file);

      // URL.createObjectURL을 사용하여 새로운 이미지 URL 생성
      const imageUrl = URL.createObjectURL(file);
      setProfileImageUrl(imageUrl);
    }
  };

  // 기본 이미지를 Blob으로 변환하는 함수
  const getDefaultImageBlob = async (): Promise<Blob> => {
    const response = await fetch(defaultProfileImg);
    const blob = await response.blob();
    return blob;
  };

  // 변경 버튼 클릭 시 처리 함수
  const handleUpdateClick = async () => {
    if (userContext && userContext.setUserInfo && userInfo) {
      try {
        let newProfileImageUrl = profileImageUrl;

        // 프로필 이미지 업로드
        if (profileImage) {
          const formData = new FormData();
          formData.append('image', profileImage);

          const uploadImageResponse = await apiUploadImage(formData);
          newProfileImageUrl = uploadImageResponse.profileImageUrl;
        }

        // 프로필 이미지 변경이 없고 기존 프로필 이미지가 없는 경우
        // 닉네임만 바꾸려고 하는 경우
        // defaultProfileImg 기본 이미지로 자동 설정
        if (!profileImage && !userInfo.profileImageUrl) {
          const defaultImageBlob = await getDefaultImageBlob();
          const formData = new FormData();
          formData.append('image', defaultImageBlob, 'default.png');

          const uploadImageResponse = await apiUploadImage(formData);
          newProfileImageUrl = uploadImageResponse.profileImageUrl;
        }

        // user 정보 업데이트 데이터 구성
        const updateData: UpdateData = {
          nickname: nickname || userInfo.nickname,
          profileImageUrl:
            newProfileImageUrl || userInfo.profileImageUrl || defaultProfileImg,
        };

        // user 정보 수정 업데이트
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
    profileImageUrl,
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
