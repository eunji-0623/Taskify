import { useState } from 'react';
import { format } from 'date-fns';
import styles from './ColumnCard.module.scss';
import Tag from '../../../../components/chip/Tag/Tag';
import TodoCardManagement from '../../../modal/TodoCardManagement/TodoCardManagement';
import { CardOverAll } from '../../../../api/apiModule';
import { UserProfileImgSvg } from '../../../../components/UserProfileImg/UserProfileImg';

interface CardProps {
  cardId: number;
  cardData: CardOverAll;
  columnData: {
    userId: number;
    columnId: number;
    dashboardId: number;
  };
}

// 날짜 표시 formating
const formatDate = (date: string) => {
  const editData: string = format(date, 'yyyy-MM-dd');
  return editData;
};

// 일정을 카드 모양으로 보여주는 컴포넌트입니다.
// 사진, 제목, 태그, 기한, 작성자이미지를 prop으로 받습니다.
function ColumnCard({ cardId, cardData, columnData }: CardProps) {
  const [manageCardModalOpen, setManageCardModalOpen] = useState<boolean>(false);
  const {
    assignee,
    title,
    dueDate,
    tags,
    imageUrl,
  } = cardData;
  // 버튼 이벤트 핸들러
  const cardOnClick = () => {
    setManageCardModalOpen(true);
  };

  // 모달 응답
  const afterSubmit = () => {
    window.location.reload();
  };
  // 컴포넌트 출력
  return (
    <div className={styles.wrapper}>
      <button type="button" onClick={cardOnClick} className={styles.container}>
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
          <div className={styles.avatar}>
            {assignee.profileImageUrl ? (
              <UserProfileImgSvg profileImageUrl={assignee.profileImageUrl} />
            ) : (
              assignee.nickname
            )}
          </div>
        </div>
      </button>

      {manageCardModalOpen ? (
        <TodoCardManagement
          isOpen={manageCardModalOpen}
          setIsOpen={setManageCardModalOpen}
          dashboardId={columnData.dashboardId}
          userId={columnData.userId}
          columnId={columnData.columnId}
          cardId={cardId}
          afterSubmit={afterSubmit}
        />
      ) : null}
    </div>
  );
}
export default ColumnCard;
