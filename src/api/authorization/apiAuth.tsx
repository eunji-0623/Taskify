import instance from '../axiosInstance';
import { handleResponse } from '../errorHandler';

interface LoginBody {
  email: string;
  password: string;
}

interface ChangePasswordBody {
  password: string;
  newPassword: string;
}

interface LoginResponse {
  status: number;
  message?: string;
  user?: {
    id: number;
    email: string;
    nickname: string;
    profileImageUrl?: string;
    createdAt: string;
    updatedAt: string;
  };
  accessToken?: string;
}

interface ChangePasswordResponse {
  status: number;
  message?: string;
}

// 로그인 요청 api
export async function apiLoginRequest(body: LoginBody): Promise<LoginResponse> {
  const res = await instance.post<LoginResponse>('/auth/login', body);
  return handleResponse(res);
}

// 비밀번호 변경 요청 api
export async function apiChangePassword(
  body: ChangePasswordBody,
): Promise<string | ChangePasswordResponse> {
  const res = await instance.put<ChangePasswordResponse>('/auth/login', body);
  return handleResponse(res);
}
