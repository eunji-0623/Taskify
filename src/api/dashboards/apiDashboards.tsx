import instance from '../axiosInstance';
import { handleResponse } from '../errorHandler';

interface DashboardsId {
  dashboardId: number;
}

interface InvitationId {
  invitationId: number;
}

interface UserEmail {
  email: string;
}

interface DashboardOverall {
  title: string;
  color: string;
}

interface DashboardDetail {
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
  userId: number;
}

interface DashboardsListQuery {
  navigationMethod: string;
  cursorId?: number;
  page?: number;
  size?: number;
}

interface InvitationQuery {
  page?: number;
  size?: number;
}

interface DashboardsListResponse {
  cursorId: number;
  totalCount: number;
  dashboards: DashboardDetail;
}

interface InvitationResponse {
  id: number;
  inviter: {
    nickname: string;
    email: string;
    id: number;
  };
  teamId: string;
  dashboard: {
    title: string;
    id: number;
  };
  invitee: {
    nickname: string;
    email: string;
    id: number;
  };
  inviteAccepted: boolean;
  createdAt: string;
  updatedAt: string;
}

interface InvitationListResponse {
  totalCount: number;
  invitations: InvitationResponse[];
}

// 대시보드 생성 api
export async function apiCreateDashboards(
  body: DashboardOverall,
): Promise<DashboardDetail> {
  const res = await instance.post<DashboardDetail>('/dashboards', body);
  return handleResponse(res);
}

// 대시보드 목록 조회 api
export async function apiDashboardsList(
  query: DashboardsListQuery = {
    navigationMethod: 'pagination',
    cursorId: undefined,
    page: 1,
    size: 10,
  },
): Promise<DashboardsListResponse> {
  const res = await instance.get('/dashboards', { params: query });
  return handleResponse(res);
}

// 대시보드 상세조회 api
export async function apiDashboardsDetail(
  path: DashboardsId,
): Promise<DashboardDetail> {
  const res = await instance.get(`/dashboards/${path.dashboardId}`);
  return handleResponse(res);
}

// 대시보드 수정 api - 생성한 사람만 수정 가능
export async function apiEditDashboards(
  body: DashboardOverall,
  path: DashboardsId,
): Promise<DashboardDetail> {
  const res = await instance.put<DashboardDetail>(
    `/dashboards/${path.dashboardId}`,
    body,
  );
  return handleResponse(res);
}

// 대시보드 삭제 api - 생성한 사람만 삭제 가능
export async function apiDeleteDashboards(path: DashboardsId) {
  const res = await instance.delete(`/dashboards/${path.dashboardId}`);
  return handleResponse(res);
}

// 대시보드 초대 api - 생성한 사람만 초대 가능
export async function apiInviteDashboards(
  body: UserEmail,
  path: DashboardsId,
): Promise<InvitationResponse> {
  const res = await instance.post(
    `/dashboards/${path.dashboardId}/invitations`,
    body,
  );
  return handleResponse(res);
}

// 대시보드 초대 목록 불러오기 api
export async function apiInvitationList(
  path: DashboardsId,
  query: InvitationQuery = { page: 1, size: 10 },
): Promise<InvitationListResponse> {
  const res = await instance.get(
    `/dashboards/${path.dashboardId}/invitations`,
    { params: query },
  );
  return handleResponse(res);
}

// 대시보드 초대 취소 api
export async function apiDeleteInvitation(
  path: DashboardsId,
  invitationPath: InvitationId,
) {
  const res = await instance.delete(
    `/dashboards/${path.dashboardId}/invitations/${invitationPath.invitationId}`,
  );
  return handleResponse(res);
}
