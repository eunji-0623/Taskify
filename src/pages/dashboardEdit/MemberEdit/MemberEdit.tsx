import EditHeader from './EditHeader';
import Member from './Member';
import styles from './MemberEdit.module.scss';

/*  대시보드 수정 페이지 중
    구성원 편집을 위한 부분입니다
    - 페이지네이션을 위한 부분과
    - 멤버 목록을 보여주는 table로 구성됩니다  */

function MemberEdit() {
  return (
    <div className={styles.container}>
      <EditHeader title="구성원" />
      <table>
        <thead className={styles.table_head}>
          <tr>
            <td>이름</td>
          </tr>
        </thead>
        <tbody>
          <Member />
          <Member />
          <Member />
          <Member />
        </tbody>
      </table>
    </div>
  );
}

export default MemberEdit;
