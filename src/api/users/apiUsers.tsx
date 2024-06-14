import instance from '../axiosInstance';
import { handleResponse } from '../errorHandler';

interface SignUpBody {
  email: string;
  nickname: string;
  password: string;
}

interface EditMyInfoBody {
  nickname: string;
  profileImageUrl: string;
}

interface UserResponse {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
}

interface EditImageResponse {
  profileImageUrl: string;
}

// 회원가입 api
export async function apiSignUp(body: SignUpBody): Promise<UserResponse> {
  const res = await instance.post<UserResponse>('/users', body);
  return handleResponse(res);
}

// 내 정보 조회 api
export async function apiInquireMyInfo(): Promise<UserResponse> {
  const res = await instance.get<UserResponse>('/users/me');
  return handleResponse(res);
}

// 내 정보 수정 api
export async function apiEditMyInfo(
  body: EditMyInfoBody,
): Promise<UserResponse> {
  const res = await instance.put<UserResponse>('/users/me', body);
  return handleResponse(res);
}

// 프로필 이미지 업로드 api
export async function apiUploadImage(
  body: FormData, // FormData로 받아오도록
): Promise<EditImageResponse> {
  const res = await instance.post<EditImageResponse>('/users/me/image', body, {
    headers: {
      'Content-Type': 'multipart/form-data', // 변경된 부분
    },
  });
  return handleResponse(res);
}
