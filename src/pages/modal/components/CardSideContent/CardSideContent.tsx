import UserProfileImg, { UserProfileImgSvg } from '../../../../components/UserProfileImg/UserProfileImg';
import styles from './CardSideContent.module.scss';

/*
  카드에 담당자와 마감일 부분입니다.
*/

interface ModalProps {
  managerImg: string | undefined;
  manager: string;
  dueDate: string;
}

function CardSideContent({ managerImg, manager, dueDate }: ModalProps) {
  return (
    <div className={styles.sideContent}>
      <div className={styles.managerBlock}>
        <h3>담당자</h3>
        <div className={styles.profileBlock}>
          {
            managerImg ? (
              <UserProfileImgSvg
                profileImageUrl={managerImg}
              />
            ) : (
              <UserProfileImg
                isImg={false}
                profileImageUrl=""
                nickname={manager}
              />
            )
          }
          <span>{manager}</span>
        </div>
      </div>
      <div className={styles.dateBlock}>
        <h3>마감일</h3>
        <span>{dueDate}</span>
      </div>
    </div>
  );
}

export default CardSideContent;
