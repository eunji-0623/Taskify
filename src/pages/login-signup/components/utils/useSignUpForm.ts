import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  apiSignUp,
  apiLoginRequest,
  apiUploadImage,
} from '../../../../api/apiModule';
import defaultProfileImg from '../../../../../public/img/default.png';

// 회원가입 폼 제출 기능을 수행하는 함수입니다.
// useNavigate를 사용하여 폼 제출 시 다른 페이지로 이동하도록 구현했습니다.
// 회원가입 시도 시 모달 창이 띄워지도록 useState를 사용하여 구현했습니다.
// 성공, 이메일 중복으로 실패, 그 밖의 에러 세 가지 경우로 나눠서 모달이 뜨도록 했습니다.
// 회원가입 중에는 버튼이 비활성화 되도록 useState를 사용하여 구현했습니다.(loading)
// SignUpForm 컴포넌트에서 사용됩니다.

// 타입 정의
export interface SignUpFormInputs {
  email: string;
  nickname: string;
  password: string;
  passwordCheck: string;
}

// 회원가입 폼 제출 기능을 수행하는 함수입니다.
function useSignUpForm() {
  const [values, setValues] = useState<SignUpFormInputs>({
    email: '',
    nickname: '',
    password: '',
    passwordCheck: '',
  });

  // 이외의 상태 관리
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const navigate = useNavigate();

  // 모달 창 닫는 함수
  const closeModal = () => {
    setIsModalOpen(false);
    setIsErrorModalOpen(false);
  };

  // 변경 성공 시 모달을 닫으면 자동으로 로그인 페이지로 이동
  const closeSuccessModalAndReload = () => {
    setIsModalOpen(false);
    navigate('/login'); // 회원가입 성공 시 로그인 페이지로 이동
  };

  // 기본 이미지를 Blob으로 변환하는 함수
  const getDefaultImageBlob = async (): Promise<Blob> => {
    const response = await fetch(defaultProfileImg);
    const blob = await response.blob();
    return blob;
  };

  // 회원가입 폼 제출
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true); // 회원가입 시도 중에는 버튼 비활성화

    const { email, nickname, password } = values;

    try {
      await apiSignUp({
        email,
        nickname,
        password,
      }); // 회원가입 API 호출

      // 회원가입 후 바로 로그인
      await apiLoginRequest({ email, password });

      // 기본 이미지를 Blob으로 변환하여 업로드
      const defaultImageBlob = await getDefaultImageBlob();
      const formData = new FormData();
      formData.append('image', defaultImageBlob, 'default.png');

      await apiUploadImage(formData); // 기본 프로필 이미지 업로드

      setIsModalOpen(true); // 성공 시 모달 창 띄우기
    } catch (error) {
      setIsErrorModalOpen(true);
    } finally {
      setLoading(false); // 회원가입 시도가 끝나면 버튼 활성화
    }
  };

  // 사용할 값 리턴
  return {
    values,
    loading,
    isModalOpen,
    isErrorModalOpen,
    setValues,
    handleSubmit,
    closeModal,
    setIsModalOpen,
    setIsErrorModalOpen,
    closeSuccessModalAndReload,
  };
}

export default useSignUpForm;
