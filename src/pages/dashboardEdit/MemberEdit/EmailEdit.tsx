import EditHeader from './EditHeader';
import Email from './Email';
import styles from './MemberEdit.module.scss';

/*  대시보드 수정 페이지 중
    초대 내역 편집을 위한 부분입니다
    - 페이지네이션을 위한 부분과
    - 보낸 초대 목록을 보여주는 table로 구성됩니다  */

function EmailEdit() {
  return (
    <div className={styles.container}>
      <EditHeader title="초대 내역" hasButton />
      <table>
        <thead className={styles.table_head}>
          <tr>
            <td>이메일</td>
          </tr>
        </thead>
        <tbody>
          <Email />
          <Email />
          <Email />
          <Email />
          <Email />
        </tbody>
      </table>
    </div>
  );
}

export default EmailEdit;
