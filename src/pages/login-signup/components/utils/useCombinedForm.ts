import useInputHandlers from './useInputHandlers';
import useSignUpForm from './useSignUpForm';
import useLoginForm from './useLoginFrom';

// useInputHandlers 함수와 useSignUpForm, useLoginForm의 Input value 값을 통일시키는 함수입니다.
// 각각 함수를 병합해서 Input의 값을 통일시켜 폼을 제출할 때 값이 생기도록 합니다.
// 기존의 불일치로 빈 값이 제출되는 현상을 수정했습니다.
// 각각 SignUpForm, LoginForm 에서 사용됩니다.

// 두 함수를 병합하여 Input의 value값 통일
export function useCombinedSignUpForm() {
  const { values, setValues, ...signUpForm } = useSignUpForm();
  const inputHandlers = useInputHandlers(values, setValues);

  return {
    values,
    setValues,
    ...signUpForm,
    ...inputHandlers,
  };
}

export function useCombinedLoginForm() {
  const { values, setValues, ...loginForm } = useLoginForm();
  const inputHandlers = useInputHandlers(values, setValues);

  return {
    values,
    setValues,
    ...loginForm,
    ...inputHandlers,
  };
}
