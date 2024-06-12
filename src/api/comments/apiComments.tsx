import instance from '../axiosInstance';
import { handleResponse } from '../errorHandler';

interface CreateCommentBody {
  content: string;
  cardId: number;
  columnId: number;
  dashboardId: number;
}

interface UpdateCommentBody {
  content: string;
}

interface CommentOverAll {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  cardId: number;
  author: {
    profileImageUrl: string;
    nickname: string;
    id: number;
  };
}

interface GetCommentListResponse {
  cursorId: number;
  comments: CommentOverAll[];
}

// 여기부터 api 함수 선언부분입니다. **************************

// 댓글 생성 api
export async function apiCreateComments(
  body: CreateCommentBody,
): Promise<CommentOverAll> {
  const res = await instance.post<CommentOverAll>('/comments', body);
  return handleResponse(res);
}

interface ParamsProps {
  cardId?: number;
  cursorId?: number;
  size?: number;
}

// 댓글 목록 조회 api
// size, cursorId, cardId를 파라미터로 받습니다.
// cursorId, size 미지정시 1페이지의 10개의 댓글을 불러옵니다.
export async function apiGetCommentList(
  cardId: number,
  cursorId: number = 0,
  size: number = 10,
): Promise<GetCommentListResponse> {
  const params: ParamsProps = {};

  params.cardId = cardId;
  if (size !== undefined) {
    params.size = size;
  } else {
    params.size = 10;
  }

  if (cursorId) {
    params.cursorId = cursorId;
  }

  const res = await instance.get<GetCommentListResponse>('/comments', {
    params,
  });
  return handleResponse(res);
}

// 댓글 수정 api
// commentId를 파라미터로 받습니다.
export async function apiUpdateComment(
  body: UpdateCommentBody,
  commentId: number,
): Promise<CommentOverAll> {
  const res = await instance.put<CommentOverAll>(
    `/comments/${commentId}`,
    body,
  );
  return handleResponse(res);
}

// 댓글 삭제 api
// commentId를 파라미터로 받습니다.
export async function apiDeleteComment(commentId: number) {
  const res = await instance.delete(`/comments/${commentId}`);
  return handleResponse(res);
}
