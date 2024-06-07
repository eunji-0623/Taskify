import styles from './UserProfileImg.module.scss';

/*
유저의 프로필 이미지 컴포넌트입니다.
프로필 이미지를 설정하지 않은 유저는 프로필 이미지가 없으므로, 
isImg를 false로 내리고 Url에는 저장된 색을 넘겨줍니다.
만약 이미지를 설정한 유저라면, isImg는 true를 넘겨주고
Url에 저장된 이미지를 넘겨줍니다.
nickname props는 이미지가 없는 유저에 한해서 FirstName만 보입니다.
*/

interface UserProfileImgProps {
  isImg: boolean;
  profileImageUrl: string;
  nickname: string;
}

function UserProfileImg({
  isImg,
  profileImageUrl,
  nickname,
}: UserProfileImgProps) {
  return (
    <div
      className={styles.UserProfileImg}
      style={!isImg ? { backgroundColor: profileImageUrl } : {}}
    >
      {isImg ? (
        <img src={profileImageUrl} alt="프로필 이미지" className={styles.Img} />
      ) : (
        <div className={styles.FirstName}>{nickname[0]}</div>
      )}
    </div>
  );
}

export default UserProfileImg;
