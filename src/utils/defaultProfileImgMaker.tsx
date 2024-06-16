import colors from './colors';

interface ToSvgProps {
  initial: string;
  size: number;
  color: string;
}

interface SvgMakerProps {
  name: string;
  size?: number;
}

// svg 이미지를 생성하는 함수입니다.
// 재사용 가능하도록 따로 분리했습니다.
function toSvgImg({ initial, size, color }: ToSvgProps) {
  // svg이미지
  const svgImg = `<svg
  width="${size}"
  height="${size}"
  viewBox="0 0 100 100"
  xmlns="http://www.w3.org/2000/svg"
  >
  <rect width="100" height="100" fill="${color}" />
  <text
    x="50%"
    y="50%"
    text-anchor="middle"
    dy=".3em"
    font-size="2.5rem"
    fill="#000000"
    font-family="Arial, sans-serif"
  >
    ${initial}
  </text>
  </svg>`;

  // base64 인코딩
  const base64Svg = btoa(unescape(encodeURIComponent(svgImg)));
  const dataUrl = `data:image/svg+xml;base64,${base64Svg}`;

  return dataUrl;
}

// 랜덤 컬러 선택기
export function RandomColorPicker() {
  const num = Math.floor(Math.random() * colors.length);
  return colors[num];
}

// 현재 프로젝트에서 사용할 수 있도록 만든 프로필 이미지 생성기입니다.
// 이름(전체), size(필수 아님)을 prop으로 받습니다.
// 약 0.6kb정도의 svg 이미지 url이 나옵니다.
function defaultProfileImgMaker({ name, size = 38 }: SvgMakerProps) {
  // 이름 첫글자
  const initial = name.charAt(0).toUpperCase();

  // 랜덤 색상 선택
  const color = RandomColorPicker();

  // 이미지 Url 생성
  const ImgUrl = toSvgImg({ initial, size, color });

  return ImgUrl;
}

export default defaultProfileImgMaker;
