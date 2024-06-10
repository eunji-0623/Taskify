import styles from './Btn.module.scss';
import SettingImg from '/icon/setting.svg';

export default function SettingBtn() {
  return (
    <button type="button">
      <img src={SettingImg} alt="톱니바퀴 모양 이미지" className={styles.SettingImg} />
      <span>설정</span>
    </button>
  );
}
