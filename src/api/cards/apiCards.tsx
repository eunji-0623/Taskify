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

interface Card {
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
  createdAt: Date;
  updatedAt: Date;
}

interface CardResponse {
  status: number;
  message?: string;
  data: Card;
}

interface GetCardListResponse {
  status: number;
  message?: string;
  data: {
    cursorId: number;
    totalCount: number;
    cards: Card[];
  };
}

interface CardDeletePesponse {
  status: number;
  message?: string;
}

// 여기부터 api 함수 선언부분입니다. **************************

// 카드 생성 api
export async function apiCreateCard(
  body: CreateCardBody,
): Promise<CardResponse> {
  const res = await instance.post<CardResponse>('/cards', body);
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
): Promise<CardResponse> {
  const res = await instance.put<CardResponse>(`/cards/${cardId}`, body);
  return handleResponse(res);
}

// 카드 조회 api
// cardId를 파라미터로 받습니다.
export async function apiCardDetails(cardId: number): Promise<CardResponse> {
  const res = await instance.get<CardResponse>(`/cards/${cardId}`);
  return handleResponse(res);
}

// 카드 삭제 api
// cardId를 파라미터로 받습니다.
export async function apiDeleteCard(
  cardId: number,
): Promise<CardDeletePesponse> {
  const res = await instance.delete<CardDeletePesponse>(`/cards/${cardId}`);
  return handleResponse(res);
}
