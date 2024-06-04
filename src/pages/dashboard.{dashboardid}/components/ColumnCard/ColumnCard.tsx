import styles from './ColumnCard.module.scss';
import Tag from '../../../../components/chip/Tag/Tag';

interface CardProps {
  assignee: string;
  title: string;
  dueDate: Date;
  tags: string[];
  imageUrl?: string;
}

// 일정을 카드 모양으로 보여주는 컴포넌트입니다.
// 사진, 제목, 태그, 기한, 작성자이미지를 prop으로 받습니다.
// 현재 작성자 이미지 대신 이름만 보여지게 처리했습니다. 수정 필요합니다.
function Card({
  assignee,
  title,
  dueDate,
  tags,
  imageUrl,
}: CardProps) {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {imageUrl && (
          <div className={styles.img}>
            <img
              className={` ${styles.withImg}`}
              src={imageUrl}
              alt="uploadedImage"
            />
          </div>
        )}
        <div className={styles.title}>{title}</div>
        <div className={styles.tag}>
          {tags.map((tag) => (
            <Tag tagName={tag} />
          ))}
        </div>
        <div className={styles.date}>
          <img src="/icon/calendar.svg" alt="calendarImg" />
          {dueDate.toLocaleDateString()}
        </div>
        <div className={styles.avatar}>{assignee}</div>
      </div>
    </div>
  );
}

Card.defaultProps = {
  imageUrl: undefined,
};
export default Card;