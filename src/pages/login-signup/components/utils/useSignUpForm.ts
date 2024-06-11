import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { apiSignUp } from '../../../../api/apiModule';

// 회원가입 폼 제출 기능을 수행하는 함수입니다.
// useForm을 사용하여 기능을 구현했습니다.
// useNavigate를 사용하여 폼 제출 시 다른 페이지로 이동하도록 구현했습니다.
// 회원가입 시도 시 모달 창이 띄워지도록 useState를 사용하여 구현했습니다.
// 성공, 이메일 중복으로 실패, 그 밖의 에러 세 가지 경우로 나눠서 모달이 뜨도록 했습니다.
// 회원가입 중에는 버튼이 비활성화 되도록 useState를 사용하여 구현했습니다.(loading)
// SignUpForm 컴포넌트에서 사용됩니다.

// 타입 정의
interface SignUpFormInputs {
  email: string;
  nickname: string;
  password: string;
  passwordCheck: string;
}

// 회원가입 폼 제출 기능을 수행하는 함수입니다.
function useSignUpForm() {
  // useForm 훅을 사용하여 폼 상태를 관리
  const { register, handleSubmit } = useForm<SignUpFormInputs>();

  // 이외의 상태 관리
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
    setLoading(true); // 회원가입 시도 중에는 버튼 비활성화
    setError(null);

    try {
      const response = await apiSignUp(data); // 회원가입 API 호출
      if (response) {
        // 회원가입 성공 시
        navigate('/login'); // 로그인 페이지로 이동
        setIsModalOpen(true); // 성공 시 모달 창 띄우기
      } else {
        // 중복된 이메일인 경우 모달 창 띄우기
        setIsErrorModalOpen(true);
        setError('중복된 이메일입니다.');
      }
    } catch (error) {
      console.error('회원가입 실패:', error);
      setIsWhatModalOpen(true); // 그 외의 이유로 실패한 경우 모달 창 띄우기
      setError('회원가입에 실패했습니다.');
    } finally {
      setLoading(false); // 회원가입 시도가 끝나면 버튼 활성화
    }
  };

  // 사용할 값 리턴
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
