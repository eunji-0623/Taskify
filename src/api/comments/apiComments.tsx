import instance from '../axiosInstance';
import { handleResponse } from '../errorHandler';

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

interface CreateCommentBody {
  content: string;
  cardId: number;
  columnId: number;
  dashboardId: number;
}

interface UpdateCommentBody {
  content: string;
}

interface CommentOverAllResponse {
  status: number;
  data: CommentOverAll;
}

interface GetCommentResponse {
  status: number;
  cursorId: number;
  data?: CommentOverAll[];
}

interface DeleteCommentResponse {
  status: number;
  message?: string;
}

// 여기부터 api 함수 선언부분입니다. **************************

// 댓글 생성 api
export async function apiCreateComments(
  body: CreateCommentBody,
): Promise<CommentOverAllResponse> {
  const res = await instance.post<CommentOverAllResponse>('/comments', body);
  return handleResponse(res);
}

// 댓글 목록 조회 api
// size, cursorId, cardId를 파라미터로 받습니다.
// cursorId, size 미지정시 1페이지의 10개의 댓글을 불러옵니다.
export async function apiGetCommentList(
  cardId: number,
  cursorId: number = 0,
  size: number = 10,
): Promise<GetCommentResponse> {
  const res = await instance.get<GetCommentResponse>('/comments', {
    params: {
      size,
      cursorId,
      cardId,
    },
  });
  return handleResponse(res);
}

// 댓글 수정 api
// commentId를 파라미터로 받습니다.
export async function apiUpdateComment(
  body: UpdateCommentBody,
  commentId: number,
): Promise<CommentOverAllResponse> {
  const res = await instance.put<CommentOverAllResponse>(
    `/comments/${commentId}`,
    body,
  );
  return handleResponse(res);
}

// 댓글 삭제 api
// commentId를 파라미터로 받습니다.
export async function apiDeleteComment(
  commentId: number,
): Promise<DeleteCommentResponse> {
  const res = await instance.delete<DeleteCommentResponse>(
    `/comments/${commentId}`,
  );
  return handleResponse(res);
}
