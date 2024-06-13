import instance from '../axiosInstance';
import { handleResponse } from '../errorHandler';

export interface CreateCardBody {
  assigneeUserId: number;
  dashboardId: number;
  columnId: number;
  title: string;
  description: string;
  dueDate: string;
  tags: string[];
  imageUrl?: string;
}

export interface UpdateCardBody {
  columnId: number;
  assigneeUserId: number;
  title: string;
  description: string;
  dueDate: string;
  tags: string[];
  imageUrl?: string;
}

export interface CardOverAll {
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
  columnId: number;
  dashboardId: number;
  createdAt: string;
  updatedAt: string;
  teamId: string;
}

export interface GetCardListResponse {
  cursorId: number;
  totalCount: number;
  cards: CardOverAll[];
}

export interface GetCardListQuery {
  size?: number;
  cursorId?: number | null;
  columnId?: number;
}

// 여기부터 api 함수 선언부분입니다. **************************

// 카드 생성 api
export async function apiCreateCard(
  body: CreateCardBody,
): Promise<CardOverAll> {
  const res = await instance.post<CardOverAll>('/cards', body);
  return handleResponse(res);
}

// 카드 목록 가져오기 api
// size, cursorId, columnId를 파라미터로 받습니다.
export async function apiGetCardList(
  query: GetCardListQuery,
): Promise<GetCardListResponse> {
  const { size, columnId, cursorId } = query;
  const res = await instance.get<GetCardListResponse>('/cards', {
    params: {
      size,
      columnId,
      cursorId,
    },
  });
  return handleResponse(res);
}

// 카드 수정 api
// cardId를 파라미터로 받습니다.
export async function apiUpdateCard(
  body: UpdateCardBody,
  cardId: number,
): Promise<CardOverAll> {
  const res = await instance.put<CardOverAll>(`/cards/${cardId}`, body);
  return handleResponse(res);
}

// 카드 조회 api
// cardId를 파라미터로 받습니다.
export async function apiCardDetails(cardId: number): Promise<CardOverAll> {
  const res = await instance.get<CardOverAll>(`/cards/${cardId}`);
  return handleResponse(res);
}

// 카드 삭제 api
// cardId를 파라미터로 받습니다.
export async function apiDeleteCard(cardId: number) {
  const res = await instance.delete(`/cards/${cardId}`);
  return handleResponse(res);
}
