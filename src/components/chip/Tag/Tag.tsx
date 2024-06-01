import tagColorSet from './tagColorSet';
import stringToFraction from '../../../utils/stringToFraction';
import useWindowSize from '../../../utils/useWindowSize';

interface TagProps {
  tagName: string;
}

function Tag({ tagName }: TagProps) {
  const { width } = useWindowSize();
  const index = Math.floor(stringToFraction(tagName) * tagColorSet.length);
  const theme = tagColorSet[index];

  const TagStyle: React.CSSProperties = {
    backgroundColor: `${theme[0]}`,
    color: `${theme[1]}`,
    borderRadius: '4px',
    display: 'inline-block',
    height: '22px',
    lineHeight: '115%',
    fontSize: '12px',
    margin: '0 3px',
    padding: '4px',
    textAlign: 'center',
  };

  // 높이조절
  if (width < 768) {
    // 모바일
    TagStyle.height = '20px';
    TagStyle.fontSize = '10px';
  }

  return <div style={TagStyle}>{tagName}</div>;
}

export default Tag;
