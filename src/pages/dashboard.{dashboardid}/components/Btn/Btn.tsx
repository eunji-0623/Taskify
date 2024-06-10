import styles from './Btn.module.scss';
import SettingImg from '/icon/setting.svg';
import AddBoxImg from '/icon/add_box.svg';

export function SettingBtn() {
  return (
    <button type="button" className={styles.SettingBtn}>
      <img src={SettingImg} alt="톱니바퀴 모양 이미지" className={styles.SettingImg} />
      <span className={styles.Text}>관리</span>
    </button>
  );
}


export function InviteBtn() {
  return (
    <button type="button" className={styles.InviteBtn}>
      <img src={AddBoxImg} alt="초대하기 버튼 이미지" className={styles.AddBoxImg} />
      <span className={styles.Text}>초대하기</span>
    </button>
  )
}