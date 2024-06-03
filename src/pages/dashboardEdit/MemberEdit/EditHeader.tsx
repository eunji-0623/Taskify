import styles from './MemberEdit.module.scss';

/*  대시보드 수정 페이지 중
    구성원, 초대 내역의 페이지네이션을 위한 부분입니다  */

interface Props {
  title: string;
  hasButton?: boolean;
}

function EditHeader({ title, hasButton }: Props) {
  return (
    <div className={styles.header}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.pagination}>
        <p>1 페이지 중 1</p>
        <div>페이지 이동 버튼</div>
        {hasButton ? <button type="button">초대하기</button> : null}
      </div>
    </div>
  );
}

EditHeader.defaultProps = {
  hasButton: false,
};

export default EditHeader;
