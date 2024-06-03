import ColorCircle from './ColorCircle';

interface ColorDotProps {
  color: string;
}

// 작은 점이 여럿 사용되서 컴포넌트로 분리했습니다.
// useMemo를 사용하면 같은 색 컴포넌트는 렌더링을 한번만 하게 할 수 있습니다.
function ColorDot({ color }: ColorDotProps) {
  return <ColorCircle color={color} diameter={8} />;
}

export default ColorDot;

// 사용예시
// <ColorDot color="#00ff37" />
// <ColorDot color="#ff0000" />
