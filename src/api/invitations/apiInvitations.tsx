import instance from '../axiosInstance';
import { handleResponse } from '../errorHandler';

interface InvitationId {
  invitationId: number;
}

interface InvitationsQuery {
  size?: number;
  cursorId?: number;
  title?: string;
}

interface InvitationAcceptBody {
  inviteAccepted: boolean;
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

interface InvitationsListResponse {
  cursorId: number;
  invitations: InvitationResponse[];
}

interface Params {
  title?: string;
  cursorId?: number;
  size?: number;
}

// 내가 받은 초대 목록 조회 api
export async function apiMyInvitationsList(
  query: InvitationsQuery,
): Promise<InvitationsListResponse> {
  const { title, cursorId, size } = query;
  const params: Params = {};

  if (title !== '') {
    params.title = title;
  }

  if (cursorId !== 0) {
    params.cursorId = cursorId;
  }

  params.size = size;

  const res = await instance.get<InvitationsListResponse>('/invitations', {
    params,
  });
  return handleResponse(res);
}

// 초대 응답 api
export async function apiInvitationAccept(
  path: InvitationId,
  body: InvitationAcceptBody,
): Promise<InvitationResponse> {
  const res = await instance.put<InvitationResponse>(
    `/invitations/${path.invitationId}`,
    body,
  );
  return handleResponse(res);
}
