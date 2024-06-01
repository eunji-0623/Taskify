import styles from './Empty.module.scss';

function Empty() {
  return (
    <div className={styles.container}>
      <img
        className={styles.icon}
        src="/icon/no_invitation.svg"
        alt="받은 초대 없음"
      />
      <p className={styles.message}>아직 초대받은 대시보드가 없어요</p>
    </div>
  );
}

export default Empty;
