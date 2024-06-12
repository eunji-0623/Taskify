import { useState } from 'react';
import { ChangeAndSaveBtn, PagenationBtn } from '../../../components/Btn/Btn';
import useWindowSize from '../../../utils/useWindowSize';
import styles from './MemberEdit.module.scss';
import InviteModal from '../../modal/InviteModal/InviteModal';

/*  대시보드 수정 페이지 중
    구성원, 초대 내역의 페이지네이션을 위한 부분입니다  */

interface Props {
  title: string;
  hasButton?: boolean;
  isFirstPage: boolean;
  isLastPage: boolean;
  currentPage: number;
  totalPages: number;
  handlePrevClick: () => void;
  handleNextClick: () => void;
}

function EditHeader({
  title,
  hasButton,
  isFirstPage,
  isLastPage,
  currentPage,
  totalPages,
  handlePrevClick,
  handleNextClick,
}: Props) {
  const { width } = useWindowSize();
  const [sendInvitation, setSendInvitation] = useState(false);

  const handleInviteButton = () => {
    setSendInvitation(!sendInvitation);
  };

  return (
    <>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.pagination}>
          <p>
            {totalPages}
            {' '}
            페이지 중
            {currentPage}
          </p>
          <PagenationBtn
            handlePrev={handlePrevClick}
            handleNext={handleNextClick}
            isFirstPage={isFirstPage}
            isLastPage={isLastPage}
          />
          {hasButton && width >= 768 ? (
            <>
              <ChangeAndSaveBtn
                BtnText="초대하기"
                handleBtn={handleInviteButton}
              />
              {sendInvitation ? (
                <InviteModal
                  isOpen={sendInvitation}
                  setIsOpen={setSendInvitation}
                />
              ) : null}
            </>
          ) : null}
        </div>
      </div>
      {hasButton && width < 768 ? (
        <div className={styles.inviteButton}>
          <ChangeAndSaveBtn BtnText="초대하기" handleBtn={handleInviteButton} />
        </div>
      ) : null}
    </>
  );
}

EditHeader.defaultProps = {
  hasButton: false,
};

export default EditHeader;
