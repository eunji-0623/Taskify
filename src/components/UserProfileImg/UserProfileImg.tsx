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

/*
svg 생성기가 있으면, 사용할 프로필 이미지 컴포넌트
우선 만들어 보았습니다. 추후 위 컴포넌트 대체 예정
props로 url 하나만 받아옵니다.
*/
interface UserProfileImg_Props {
  profileImageUrl : string;
}

export function UserProfileImg_ ({profileImageUrl} : UserProfileImg_Props) {
  return (
    <img src={profileImageUrl} alt="프로필 이미지" className={styles.UserProfileImg_}/>
  )
}


export default UserProfileImg;
