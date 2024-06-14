import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import ModalContainer from '../ModalContainer/ModalContainer';
import Tag from '../../../components/chip/Tag/Tag';
import Comment from '../components/Comment/Comment';
import ProgressState from '../../../components/chip/ProgressState/ProgressState';
import { apiDeleteCard, apiGetColumnList } from '../../../api/apiModule';
import styles from './TodoCardModal.module.scss';
import CloseIcon from '/icon/close.svg';
import KebabIcon from '/icon/kebab.svg';
import CardSideContent from '../components/CardSideContent/CardSideContent';
import CardContent from '../components/CardContent/CardContent';

/*
  할 일 카드 모달입니다.
*/

interface CardOverAll {
  id: number;
  title: string;
  description: string;
  tags: string[];
  dueDate: string;
  assignee: {
    profileImageUrl?: string;
    nickname: string;
    id: number;
  };
  imageUrl?: string;
  teamId: string;
  columnId: number;
  dashboardId: number;
  createdAt: string;
  updatedAt: string;
}

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  openEditModal: () => void;
  cardId: number;
  cardData: CardOverAll | undefined;
  columnId: number;
  userId: number;
  dashboardId: number;
  afterSubmit: () => void;
}

function TodoCardModal({
  isOpen,
  setIsOpen,
  openEditModal,
  cardId,
  cardData,
  columnId,
  userId,
  dashboardId,
  afterSubmit,
}: ModalProps) {
  const [kebabOpen, setKebabOpen] = useState(false);
  const [cardState, setCardState] = useState('');
  const kebabRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (kebabOpen && kebabRef.current && !kebabRef.current.contains(event.target as Node)) {
        setKebabOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [kebabOpen]);

  // 컬럼 리스트 조회
  useEffect(() => {
    const fetchDashboardDetail = async () => {
      try {
        const response = await apiGetColumnList(dashboardId);
        if (response.result === 'SUCCESS') {
          const column = response.data.find((item) => item.id === columnId);
          setCardState(column ? column.title : '');
        } else {
          throw new Error('error');
        }
      } catch (error) {
        throw new Error('error');
      }
    };

    fetchDashboardDetail();
  }, [dashboardId, columnId]);

  // 모달 닫기
  const close = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const handleOpen = () => {
    setKebabOpen(!kebabOpen);
  };

  // 수정하기 버튼을 클릭하면 할 일 수정 모달이 열립니다.
  const handleEditOpen = () => {
    openEditModal();
  };

  // 삭제하기 버튼
  const apiDelete = async () => {
    try {
      await apiDeleteCard(cardId);
      setIsOpen(false);
      window.location.reload();
    } catch (error) {
      throw new Error('error');
    }
    afterSubmit();
  };

  if (!cardData) {
    return null;
  }

  return (
    <ModalContainer isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className={styles.container}>
        <h1>{cardData.title}</h1>
        <div className={styles.block}>
          <div className={styles.buttonBlock}>
            <button className={styles.kebabButton} type="button" onClick={handleOpen}>
              <img src={KebabIcon} alt="케밥 아이콘" />
            </button>
            {kebabOpen
              ? (
                <div className={styles.kebabButtons} ref={kebabRef}>
                  <button className={styles.kebabItem} type="button" onClick={handleEditOpen}>수정하기</button>
                  <button className={styles.kebabItem} type="button" onClick={apiDelete}>삭제하기</button>
                </div>
              ) : null}
            <button className={styles.cancelButton} type="button" onClick={close}>
              <img src={CloseIcon} alt="닫기 아이콘" />
            </button>
          </div>

          <CardSideContent
            managerImg={cardData.assignee.profileImageUrl}
            manager={cardData.assignee.nickname}
            dueDate={cardData.dueDate}
          />

          <div className={styles.topBlock}>
            <span className={styles.condition}>
              <ProgressState content={cardState} />
            </span>
            <div className={styles.tagBlock}>
              {cardData.tags.map((item) => (
                <span key={item}>
                  <Tag tagName={item} />
                </span>
              ))}
            </div>
          </div>

          <CardContent description={cardData.description} imageUrl={cardData.imageUrl} />

          <Comment cardId={cardId} columnId={columnId} userId={userId} dashboardId={dashboardId} />
        </div>
      </div>
    </ModalContainer>
  );
}

export default TodoCardModal;
