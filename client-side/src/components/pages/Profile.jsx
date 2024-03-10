import { useSelector } from "react-redux/es/hooks/useSelector";


function UserProfile() {

  const user = useSelector((state) => state.user); //

  return (
    <div>
      <p>{user.fullName}</p>
    </div>
  );
}

export default UserProfile;
