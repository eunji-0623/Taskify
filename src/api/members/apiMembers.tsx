import instance from '../axiosInstance';
import { handleResponse } from '../errorHandler';

interface MemberId {
  memberId: number;
}

interface MemberQuery {
  dashboardId: number | undefined;
  page?: number;
  size?: number;
}

interface MemberListResponse {
  members: [
    {
      id: number;
      userId: number;
      email: string;
      nickname: string;
      profileImageUrl: string;
      createdAt: string;
      updatedAt: string;
      isOwner: boolean;
    },
  ];
  totalCount: number;
}

// 대시보드 멤버 목록 조회 api
export async function apiMemberList(
  query: MemberQuery,
): Promise<MemberListResponse> {
  const res = await instance.get<MemberListResponse>('/members', {
    params: query,
  });
  return handleResponse(res);
}

// 대시보드 멤버 삭제 api
export async function apiDeleteMemeber(path: MemberId) {
  const res = await instance.delete(`/members/${path.memberId}`);
  return handleResponse(res);
}
