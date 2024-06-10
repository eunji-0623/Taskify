import instance from '../axiosInstance';
import { handleResponse } from '../errorHandler';

interface ColumnOverAll {
  id: 0;
  title: string;
  createdAt: string;
  updatedAt: string;
}

interface CreateColumnBody {
  title: string;
  dashboardId: number;
}

interface UpdateColumnBody {
  title: string;
}

interface UploadCardImageBody {
  image: string;
}

interface ColumnOverAllResponse {
  status: number;
  data: ColumnOverAll;
}

interface GetColumnResponse {
  status: number;
  result?: 'SUCCESS';
  data?: ColumnOverAll[];
}

interface DeleteColumnResponse {
  status: number;
  message?: string;
}

interface UploadCardImageResponse {
  status: number;
  imageUrl: string;
}

// 여기부터 api 함수 선언부분입니다. **************************

// 컬럼 생성 api
export async function apiCreateColumn(
  body: CreateColumnBody,
): Promise<ColumnOverAllResponse> {
  const res = await instance.post<ColumnOverAllResponse>('/cards', body);
  return handleResponse(res);
}

// 컬럼 목록 조회 api
// dashboardId를 파라미터로 받습니다.
export async function apiGetColumnList(
  dashboardId: number,
): Promise<GetColumnResponse> {
  const res = await instance.get<GetColumnResponse>('/cards', {
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
): Promise<ColumnOverAllResponse> {
  const res = await instance.put<ColumnOverAllResponse>(`/cards/${columnId}`, body);
  return handleResponse(res);
}

// 컬럼 삭제
// columnId를 파라미터로 받습니다.
export async function apiDeleteColumn(
  columnId: number,
): Promise<DeleteColumnResponse> {
  const res = await instance.delete<DeleteColumnResponse>(`/cards/${columnId}`);
  return handleResponse(res);
}

// 카드 이미지 업로드
// columnId를 파라미터로 받습니다.
export async function apiUploadCardImage(
  body: UploadCardImageBody,
  columnId: number,
): Promise<UploadCardImageResponse> {
  const res = await instance.post<UploadCardImageResponse>(
    `/cards/${columnId}/card-image`,
    body,
  );
  return handleResponse(res);
}
