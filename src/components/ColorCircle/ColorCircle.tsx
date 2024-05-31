interface CircleProps {
  color: string;
  diameter: number;
  children?: React.ReactNode;
}

// 색상코드, 지름, 내부요소 prop을 받아 원을 만들어줍니다.
// 내부요소는 필수가 아니며, 있을 시 중앙정렬됩니다.
function ColorCircle({ color, diameter, children }: CircleProps) {
  const circleStyle = {
    backgroundColor: color,
    width: `${diameter}px`,
    height: `${diameter}px`,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    textAlign: 'center'
  } as React.CSSProperties;

  return <div style={circleStyle}>{children}</div>;
}

ColorCircle.defaultProps = {
  children: undefined
};

export default ColorCircle;
