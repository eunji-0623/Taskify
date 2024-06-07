import styles from './Btn.module.scss';
import AddTaskImg from '/icon/add_task.svg';
import ArrowLeft from '/icon/arrow_left.svg';
import ArrowRight from '/icon/arrow_right.svg';

const BtnColors = {
  blue: '#5534DA',
  white: '#FFF',
};

interface BtnProps {
  BtnText: string;
  handleBtn: () => void;
}

//  모든 버튼 컴포넌트는 반응형이 적용됩니다.

/*
수락 | 거절  버튼에 쓰일 공용 컴포넌트입니다.
두 버튼이 같이 flex 형태로 보입니다.
수락과, 거절 두 종류의 handle 함수를 props로 내려주어야 합니다.
*/
interface AcceptAndRejectBtnProps {
  handleAccept: () => void;
  handdleReject: () => void;
}

export function AcceptAndRejectBtn({
  handleAccept,
  handdleReject,
}: AcceptAndRejectBtnProps) {
  return (
    <div className={styles.AcceptAndRejectBtn}>
      <button
        onClick={handleAccept}
        className={styles.AcceptBtn}
        color={BtnColors.white}
        type="button"
      >
        수락
      </button>
      <button
        onClick={handdleReject}
        className={styles.RejectBtn}
        color={BtnColors.blue}
        type="button"
      >
        거절
      </button>
    </div>
  );
}

/*
삭제, 취소 버튼에 쓰일 공용 컴포넌트입니다.
props로 "삭제" 와 같이 버튼의 내용과, 동작 함수를 내려주면 됩니다.
*/

export function DeleteBtn({ BtnText, handleBtn }: BtnProps) {
  return (
    <button className={styles.DeleteBtn} onClick={handleBtn} type="button">
      {BtnText}
    </button>
  );
}

/*
변경 , 저장 버튼에 쓰일 공용 컴포넌트입니다.
props로 "변경" 과 같이 버튼의 내용과, 동작 함수를 내려주면 됩니다.
*/

export function ChangeAndSaveBtn({ BtnText, handleBtn }: BtnProps) {
  return (
    <button
      className={styles.ChangeAndSaveBtn}
      onClick={handleBtn}
      type="button"
    >
      {BtnText}
    </button>
  );
}

/*
일정 추가하기 버튼
동작 함수만 Props로 내려주면 됩니다.
*/

interface OnlyHandleProps {
  handleBtn: () => void;
}

export function AddNewTaskBtn({ handleBtn }: OnlyHandleProps) {
  return (
    <button className={styles.AddNewTask} onClick={handleBtn} type="button">
      <img
        src={AddTaskImg}
        alt="일정 추가 버튼 이미지"
        className={styles.AddTaskImg}
      />
    </button>
  );
}

/*
새로운 칼럼 추가하기 버튼
동작 함수만 Props로 내려주면 됩니다.
*/

export function AddNewColumnBtn({ handleBtn }: OnlyHandleProps) {
  return (
    <button className={styles.AddNewColumn} onClick={handleBtn} type="button">
      <div className={styles.AddNewColumnContainer}>
        <span className={styles.AddNewColumnText}>새로운 칼럼 추가하기</span>
        <img
          src={AddTaskImg}
          alt="일정 추가 버튼 이미지"
          className={styles.AddTaskImg}
        />
      </div>
    </button>
  );
}

/*
대시보드 삭제하기 버튼
동작 함수만 Props로 내려주면 됩니다.
*/

export function DeleteDashBoardBtn({ handleBtn }: OnlyHandleProps) {
  return (
    <button
      className={styles.DeleteDashBoardBtn}
      onClick={handleBtn}
      type="button"
    >
      대시보드 삭제하기
    </button>
  );
}

//  페이지네이션 버튼입니다.
//  기능 추후 추가 예정입니다.

interface PagenationBtnProps {
  handlePrev: () => void;
  handleNext: () => void;
}

export function PagenationBtn({ handlePrev, handleNext }: PagenationBtnProps) {
  return (
    <div className={styles.PagenationBtn}>
      <button className={styles.PrevBtn} type="button" onClick={handlePrev}>
        <img src={ArrowLeft} alt="이전 페이지 화살표" width={16} height={16} />
      </button>
      <button className={styles.NextBtn} type="button" onClick={handleNext}>
        <img src={ArrowRight} alt="다음 페이지 화살표" width={16} height={16} />
      </button>
    </div>
  );
}
