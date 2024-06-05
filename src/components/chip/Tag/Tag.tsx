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
    height: '1.375rem',
    lineHeight: '115%',
    fontSize: '0.75rem',
    margin: '0 3px',
    padding: '0.25rem',
    textAlign: 'center',
  };

  // 모바일
  if (width < 768) {
    TagStyle.height = '1.25rem';
    TagStyle.fontSize = '0.625rem';
  }

  return <div style={TagStyle}>{tagName}</div>;
}

export default Tag;
