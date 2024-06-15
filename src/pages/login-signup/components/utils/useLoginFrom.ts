import { useState, useContext } from 'react';
import { UserContext } from '../../../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { apiLoginRequest, apiInquireMyInfo } from '../../../../api/apiModule';

// 로그인 폼 제출 기능을 수행하는 함수입니다.
// useNavigate를 사용하여 폼 제출 시 다른 페이지로 이동하도록 구현했습니다.
// 로그인 실패 시 모달 창이 띄워지도록 useState를 사용하여 구현했습니다.(isModalOpen)
// 로그인 중에는 버튼이 비활성화 되도록 useState를 사용하여 구현했습니다.(loading)
// LoginForm 컴포넌트에서 사용됩니다.

// 타입 정의
interface LoginFormInputs {
  email: string;
  nickname: string;
  password: string;
  passwordCheck: string;
}
function useLoginForm() {
  // Input value 값 상태 관리
  const [values, setValues] = useState<LoginFormInputs>({
    email: '',
    nickname: '',
    password: '',
    passwordCheck: '',
  });

  // 이외의 상태 관리
  const [loading, setLoading] = useState(false);
  const [, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // 모달 창 닫는 함수
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error('반드시 DashboardProvider 안에서 사용해야 합니다.');
  }
  const { setUserInfo } = userContext;

  // 로그인 버튼 시 실행
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true); // 로그인 시도 중에는 버튼 비활성화
    setError(null);

    const { email, password } = values;

    try {
      const response = await apiLoginRequest({ email, password });

      // 로그인 후 토큰을 로컬 스토리지에 저장
      const token = response.accessToken;
      if (token) {
        localStorage.setItem('Token', token);
        // 이후 API 요청은 저장된 토큰을 사용할 수 있습니다.
      } else {
        throw new Error('로그인 응답에 토큰이 없습니다.');
      }

      const userInfo = await apiInquireMyInfo();

      const profileImageUrlWithTimestamp = `${
        userInfo.profileImageUrl
      }?timestamp=${new Date().getTime()}`;
      setUserInfo({
        ...userInfo,
        profileImageUrl: profileImageUrlWithTimestamp,
      });
      localStorage.setItem('profileImageUrl', profileImageUrlWithTimestamp);

      // 페이지를 강제로 리로드하여 이미지 변경 반영
      window.location.reload();

      navigate('/mydashboard'); // 로그인 성공 시 mydashboard 페이지로 이동
    } catch (error) {
      setIsModalOpen(true); // 로그인 실패 시 모달 창 띄우기
    } finally {
      setLoading(false); // 로그인 시도가 끝나면 버튼 활성화
    }
  };

  // 사용할 값 리턴
  return {
    values,
    loading,
    isModalOpen,
    setValues,
    handleSubmit,
    closeModal,
    setIsModalOpen,
  };
}

export default useLoginForm;
