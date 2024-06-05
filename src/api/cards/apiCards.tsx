import instance from '../axiosInstance';
import { handleResponse } from '../errorHandler';

interface CreateCard {
  email: string;
  password: string;
}

interface CreateCardResponse {
  user: string;
  accessToken: string;
}

interface GetCardListResponse {
  status: number;
  message: string;
}

// 카드 생성 api
export async function apiCreateCard(
  body: CreateCard,
): Promise<CreateCardResponse> {
  const res = await instance.post<CreateCardResponse>('/cards', body);
  return handleResponse(res);
}

// 카드 목록 가져오기 api
// page, li
export async function apiGetCardList(
  page: number,
  limit: number,
): Promise<GetCardListResponse> {
  const res = await instance.get<GetCardListResponse>('/cards', {
    params: {
      page,
      limit,
    },
  });
  return handleResponse(res);
}
