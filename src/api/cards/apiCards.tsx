import instance from '../axiosInstance';
import { handleResponse } from '../errorHandler';

interface CreateCardBody {
  assigneeUserId: number;
  dashboardId: number;
  columnId: number;
  title: string;
  description: string;
  dueDate: string;
  tags: string[];
  imageUrl?: string;
}

interface UpdateCardBody {
  columnId: number;
  assigneeUserId: number;
  title: string;
  description: string;
  dueDate: string;
  tags: string[];
  imageUrl?: string;
}

interface CardOverAll {
  id: number;
  title: string;
  description: string;
  tags: string[];
  dueDate: string;
  assignee: {
    profileImageUrl?: string;
    nickname: string;
    id: number;
  };
  imageUrl?: string;
  teamId: string;
  columnId: number;
  createdAt: string;
  updatedAt: string;
}

interface CardOverAllResponse {
  status: number;
  data: CardOverAll;
}

interface GetCardListResponse {
  status: number;
  data: {
    cursorId: number;
    totalCount: number;
    cards: CardOverAll[];
  };
}

interface DeleteCardResponse {
  status: number;
  message?: string;
}

// 여기부터 api 함수 선언부분입니다. **************************

// 카드 생성 api
export async function apiCreateCard(
  body: CreateCardBody,
): Promise<CardOverAllResponse> {
  const res = await instance.post<CardOverAllResponse>('/cards', body);
  return handleResponse(res);
}

// 카드 목록 가져오기 api
// size, cursorId, columnId를 파라미터로 받습니다.
export async function apiGetCardList(
  size: number,
  cursorId: number,
  columnId: number,
): Promise<GetCardListResponse> {
  const res = await instance.get<GetCardListResponse>('/cards', {
    params: {
      size,
      cursorId,
      columnId,
    },
  });
  return handleResponse(res);
}

// 카드 수정 api
// cardId를 파라미터로 받습니다.
export async function apiUpdateCard(
  body: UpdateCardBody,
  cardId: number,
): Promise<CardOverAllResponse> {
  const res = await instance.put<CardOverAllResponse>(`/cards/${cardId}`, body);
  return handleResponse(res);
}

// 카드 조회 api
// cardId를 파라미터로 받습니다.
export async function apiCardDetails(cardId: number): Promise<CardOverAllResponse> {
  const res = await instance.get<CardOverAllResponse>(`/cards/${cardId}`);
  return handleResponse(res);
}

// 카드 삭제 api
// cardId를 파라미터로 받습니다.
export async function apiDeleteCard(
  cardId: number,
): Promise<DeleteCardResponse> {
  const res = await instance.delete<DeleteCardResponse>(`/cards/${cardId}`);
  return handleResponse(res);
}
