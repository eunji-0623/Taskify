// InputType enum으로 따로 선언
// LoginForm, SignUpForm 컴포넌트에서 사용
export enum InputType {
  Text = 'text',
  Email = 'email',
  Password = 'password',
}

// User 타입 선언 => useUser에 타입 적용 => API요청 setUser(response.user ?? null)
// useLoginForm 에서 사용
export interface User {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl?: string | undefined;
  createdAt: string;
  updatedAt: string;
}
