import instance from '../axiosInstance';
import { handleResponse } from '../errorHandler';

interface DashboardId {
  dashboardId: number;
}

interface MemberId {
  memberId: number;
}

interface MemberQuery {
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
    }
  ];
  totalCount: number;
}

// 대시보드 멤버 목록 조회 api
export async function apiMemberList(
  queryId: DashboardId,
  query: MemberQuery = { size: 10, page: 1 }
): Promise<MemberListResponse> {
  const res = await instance.get<MemberListResponse>(
    `/members?dashboardId=${queryId.dashboardId}&size=${query.size}&page=${query.page}`
  );
  return handleResponse(res);
}

// 대시보드 멤버 삭제 api
export async function apiDeleteMemeber(path: MemberId) {
  const res = await instance.delete(`/members/${path.memberId}`);
  return handleResponse(res);
}
