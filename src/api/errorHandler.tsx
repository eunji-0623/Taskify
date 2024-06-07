import { AxiosResponse } from 'axios';

// 응답에서 에러메시지를 추출해 문자열로 리턴합니다.
export const extractErrorMessage = (response: AxiosResponse): string => {
  let errorMessage = 'extractErrorMessage 함수 에러';

  // 에러 타입이 JSON일경우
  if (response.headers['content-type']?.includes('application/json')) {
    const errorData = response.data;
    errorMessage = errorData.message || JSON.stringify(errorData);
    // 에러 타입이 문자열일 경우
  } else {
    errorMessage = response.statusText || '알 수 없는 오류가 발생했습니다.';
  }
  return errorMessage;
};

// 응답이 정상인지 검사하고, 정상이면 응답 데이터를, 에러가 발생하면 에러 메세지를 문자열로 리턴합니다.
// catch문에서 (err)로 errorMessage에 접근할 수 있습니다.
export const handleResponse = (response: AxiosResponse) => {
  if (response.status < 200 || response.status >= 300) {
    const errorMessage = extractErrorMessage(response);
    return Promise.reject(errorMessage);
  }
  // 성공 204코드는 데이터가 없습니다.
  if (response.status === 204 && !response.data) {
    return Promise.resolve('204NoData');
  }
  return Promise.resolve(response.data);
};
