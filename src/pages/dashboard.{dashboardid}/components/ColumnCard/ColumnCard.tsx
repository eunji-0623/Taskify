import { format } from 'date-fns';
import styles from './ColumnCard.module.scss';
import Tag from '../../../../components/chip/Tag/Tag';

interface CardProps {
  assignee: string;
  title: string;
  dueDate: string;
  tags: string[];
  imageUrl?: string;
}

const formatDate = (date: string) => {
  const editData: string = format(date, 'yyyy-MM-dd HH:mm');
  return editData;
};

// 일정을 카드 모양으로 보여주는 컴포넌트입니다.
// 사진, 제목, 태그, 기한, 작성자이미지를 prop으로 받습니다.
// 현재 작성자 이미지 대신 이름만 보여지게 처리했습니다. 수정 필요합니다.
function ColumnCard({
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
              alt="uploadedTaskImage"
            />
          </div>
        )}
        <div className={styles.title}>{title}</div>
        <div className={styles.tag}>
          {tags.map((tag) => (
            <Tag tagName={tag} key={tag} />
          ))}
        </div>
        <div className={styles.date}>
          <img src="/icon/calendar.svg" alt="calendarImg" />
          {formatDate(dueDate)}
        </div>
        <div className={styles.avatar}>{assignee}</div>
      </div>
    </div>
  );
}

ColumnCard.defaultProps = {
  imageUrl: undefined,
};
export default ColumnCard;
