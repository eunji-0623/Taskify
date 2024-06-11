import instance from '../axiosInstance';
import { handleResponse } from '../errorHandler';

export interface LoginBody {
  email: string;
  password: string;
}

export interface ChangePasswordBody {
  password: string;
  newPassword: string;
}

export interface LoginResponse {
  user: {
    id: number;
    email: string;
    nickname: string;
    profileImageUrl?: string;
    createdAt: string;
    updatedAt: string;
  };
  accessToken: string;
}

// 로그인 요청 api
export async function apiLoginRequest(body: LoginBody): Promise<LoginResponse> {
  const res = await instance.post<LoginResponse>('/auth/login', body);
  const responseData = await handleResponse(res);
  const token = responseData.accessToken;
  if (token) {
    localStorage.setItem('Token', token);
  }
  return responseData;
}

// 비밀번호 변경 요청 api
export async function apiChangePassword(body: ChangePasswordBody) {
  const res = await instance.put('/auth/password', body);
  return handleResponse(res);
}
