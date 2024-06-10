import ModalContainer from '../ModalContainer/ModalContainer';
import DropdownManagement from '../components/DropdownManagement/DropdownManagement';
import Title from '../components/Title/Title';
import Calendar from '../components/Calendar/Calendar';
import TodoContent from '../components/TodoContent/TodoContent';
import InputTag from '../components/InputTag/InputTag';
import InputImage from '../components/InputImage/InputImage';
import styles from './EditTodoModal.module.scss';
import TestImg from '/img/test_img.png';

/*
  할 일 수정을 위한 모달입니다.

  할 일 카드 모달과 연결을 위해 직접 사용하는 것이 아닌 TodoCardManagement를 통해 사용합니다.
*/

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  openTodoModal: () => void;
  cardData: {
    cardState: string;
    manager: string;
    managerImg: string;
    title: string;
    description: string;
    dueDate: string;
    tags: string[];
    imageUrl: string;
  };
  cardSetData: {
    setCardState: React.Dispatch<React.SetStateAction<string>>;
    setManager: React.Dispatch<React.SetStateAction<string>>;
    setManagerImg: React.Dispatch<React.SetStateAction<string>>;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    setDescription: React.Dispatch<React.SetStateAction<string>>;
    setDueDate: React.Dispatch<React.SetStateAction<string>>;
    setTags: React.Dispatch<React.SetStateAction<string[]>>;
    setImageUrl: React.Dispatch<React.SetStateAction<string>>;
  };
}

// 할 일 데이터가 필요
function EditTodoModal({
  isOpen,
  setIsOpen,
  openTodoModal,
  cardData,
  cardSetData,
}: ModalProps) {
  const {
    cardState,
    manager,
    managerImg,
    title,
    description,
    dueDate,
    tags,
    imageUrl,
  } = cardData;

  const {
    setCardState,
    setManager,
    setManagerImg,
    setTitle,
    setDescription,
    setDueDate,
    setTags,
    setImageUrl,
  } = cardSetData;

  const test11 = cardState.length !== 0 && title.length !== 0 && description.length !== 0;

  // 테스트 데이터
  const data = [
    {
      id: 1,
      text: 'test1',
      profile: TestImg,
    },
    {
      id: 2,
      text: 'test2',
      profile: TestImg,
    },
  ];

  // 모달 닫기
  // const close = useCallback(() => {
  //   setIsOpen(false);
  // }, [setIsOpen]);

  // + 할 일 수정 버튼 클릭 시 동작 추가
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  // 취소 버튼을 클릭하면 할 일 카드 모달로 돌아갑니다.
  const handleTodoOpen = () => {
    openTodoModal();
  };

  return (
    <ModalContainer isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className={styles.container}>
        <h1>할 일 수정</h1>

        <form onSubmit={handleSubmit}>
          <div className={styles.content}>
            <DropdownManagement
              cardState={cardState}
              setCardState={setCardState}
              manager={manager}
              setManager={setManager}
              data={data}
              managerImg={managerImg}
              setManagerImg={setManagerImg}
              text=""
            />

            <Title title={title} setTitle={setTitle} />

            <TodoContent description={description} setDescription={setDescription} />

            <Calendar dueDate={dueDate} setDueDate={setDueDate} />

            <InputTag tags={tags} setTags={setTags} />

            <InputImage imageUrl={imageUrl} setImageUrl={setImageUrl} text="" />
          </div>

          <div className={styles.buttonBlock}>
            <button className={styles.cancelButton} type="button" onClick={handleTodoOpen}>취소</button>
            <button className={test11 ? styles.createButton : styles.inactiveButton} type="submit">수정</button>
          </div>
        </form>
      </div>
    </ModalContainer>
  );
}

export default EditTodoModal;
