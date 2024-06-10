import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { apiSignUp } from '../../../../api/apiModule';

interface SignUpFormInputs {
  email: string;
  nickname: string; // 닉네임 추가
  password: string;
  passwordCheck: string;
}

// 회원가입 폼 제출 기능을 수행하는 함수입니다.
function useSignUpForm() {
  // useForm 훅을 사용하여 폼 상태를 관리
  const { register, handleSubmit } = useForm<SignUpFormInputs>();

  const [loading, setLoading] = useState(false);
  const [, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isWhatModalOpen, setIsWhatModalOpen] = useState(false);
  const navigate = useNavigate();

  // 모달 창 닫는 함수
  const closeModal = () => {
    setIsModalOpen(false);
    setIsErrorModalOpen(false);
    setIsWhatModalOpen(false);
  };

  const onSubmit = async (data: SignUpFormInputs) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiSignUp(data); // 회원가입 API 호출
      if (response) {
        // 회원가입 성공 시
        navigate('/login'); // 로그인 페이지로 이동
        setIsModalOpen(true); // 모달 창 띄우기
      } else {
        // 중복된 이메일인 경우
        setIsErrorModalOpen(true);
        setError('중복된 이메일입니다.');
      }
    } catch (error) {
      console.error('회원가입 실패:', error);
      setIsWhatModalOpen(true); // 그 외의 이유로 실패한 경우
      setError('회원가입에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    isModalOpen,
    isErrorModalOpen,
    isWhatModalOpen,
    register,
    handleSubmit: handleSubmit(onSubmit),
    closeModal,
    setIsModalOpen,
    setIsErrorModalOpen,
    setIsWhatModalOpen,
  };
}

export default useSignUpForm;
