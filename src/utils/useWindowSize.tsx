import { useState, useEffect } from 'react';

const useWindowSize = () => {
  // windowSize는 화면의 가로, 세로 크기를 객체로 갖습니다.
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  // 초기값 설정
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return windowSize;
};

export default useWindowSize;

// 컴포넌트에서 반응형 디자인을 구현하기 위한 커스텀 훅입니다.
// scss에서의 반응형 디자인은 styles/media.scss를 참고해주세요.

// import useWindowSize from './useWindowSize';
// const { width } = useWindowSize(); 하여 width나 height를 추출합니다.
