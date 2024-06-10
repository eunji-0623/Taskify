// InputType enum으로 따로 선언
export enum InputType {
  Text = 'text',
  Email = 'email',
  Password = 'password',
}

// User 타입 선언 => useUser에 타입 적용 => API요청 setUser(response.user ?? null)
export interface User {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl?: string | undefined;
  createdAt: string;
  updatedAt: string;
}
