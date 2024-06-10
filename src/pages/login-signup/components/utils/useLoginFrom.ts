import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { apiLoginRequest } from '../../../../api/apiModule';
import { User } from './constants';

interface LoginFormInputs {
  email: string;
  password: string;
}

// 로그인 폼 제출 기능을 수행하는 함수입니다.
function useLoginForm() {
  // useForm 훅을 사용하여 폼 상태를 관리
  const { register, handleSubmit } = useForm<LoginFormInputs>();

  const [loading, setLoading] = useState(false);
  const [, setError] = useState<string | null>(null);
  const [, setUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // 모달 창 닫는 함수
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async (data: LoginFormInputs) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiLoginRequest(data);
      setUser(response.user ?? null);
      navigate('/mydashboard'); // 로그인 성공 시 mydashboard 페이지로 이동
    } catch (error) {
      setIsModalOpen(true); // 로그인 실패 시 모달 창 띄우기
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    isModalOpen,
    register,
    handleSubmit: handleSubmit(onSubmit),
    closeModal,
    setIsModalOpen,
  };
}

export default useLoginForm;
