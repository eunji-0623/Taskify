import instance from '../axiosInstance';
import { handleResponse } from '../errorHandler';

export interface CreateColumnBody {
  title: string;
  dashboardId: number;
}

export interface UpdateColumnBody {
  title: string;
}

export interface UploadCardImageBody {
  image: string;
}

export interface ColumnOverAll {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetColumnListResponse {
  result: string;
  data: ColumnOverAll[];
}

export interface UploadCardImageResponse {
  imageUrl: string;
}

// 여기부터 api 함수 선언부분입니다. **************************

// 컬럼 생성 api
export async function apiCreateColumn(
  body: CreateColumnBody,
): Promise<ColumnOverAll> {
  const res = await instance.post<ColumnOverAll>('/columns', body);
  return handleResponse(res);
}

// 컬럼 목록 조회 api
// dashboardId를 파라미터로 받습니다.
export async function apiGetColumnList(
  dashboardId: number,
): Promise<GetColumnListResponse> {
  const res = await instance.get<GetColumnListResponse>('/columns', {
    params: {
      dashboardId,
    },
  });
  return handleResponse(res);
}

// 컬럼 수정
// columnId를 파라미터로 받습니다.
export async function apiUpdateColumn(
  body: UpdateColumnBody,
  columnId: number,
): Promise<ColumnOverAll> {
  const res = await instance.put<ColumnOverAll>(`/columns/${columnId}`, body);
  return handleResponse(res);
}

// 컬럼 삭제
// columnId를 파라미터로 받습니다.
export async function apiDeleteColumn(columnId: number) {
  const res = await instance.delete(`/columns/${columnId}`);
  return handleResponse(res);
}

// 카드 이미지 업로드
// columnId를 파라미터로 받습니다.
export async function apiUploadCardImage(
  body: FormData,
  columnId: number,
): Promise<UploadCardImageResponse> {
  const res = await instance.post<UploadCardImageResponse>(
    `/columns/${columnId}/card-image`, body, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  return handleResponse(res);
}
