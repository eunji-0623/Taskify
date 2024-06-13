import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiSignUp } from '../../../../api/apiModule';
import defaultProfileImgMaker from '../../../../utils/defaultProfileImgMaker';

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
  const [, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true); // 회원가입 시도 중에는 버튼 비활성화
    setError(null);

    const { email, nickname, password } = values;

    try {
      await apiSignUp({ email, nickname, password }); // 회원가입 API 호출
      setIsModalOpen(true); // 성공 시 모달 창 띄우기
      navigate('/login'); // 회원가입 성공 시 로그인 페이지로 이동
      defaultProfileImgMaker;
    } catch (error) {
      setIsErrorModalOpen(true);
      setError('중복된 이메일입니다.');
    } finally {
      setLoading(false); // 회원가입 시도가 끝나면 버튼 활성화
    }
  };

  // 모달 창 닫는 함수
  const closeModal = () => {
    setIsModalOpen(false);
    setIsErrorModalOpen(false);
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
  };
}

export default useSignUpForm;
