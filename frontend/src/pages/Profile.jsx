import { useAuth } from "../utils/AuthContext";
import { toast } from "react-toastify";



const Profile = () => {
  const { user} = useAuth();

  const onToast = () => {
    toast.success("Login Successful!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  return (
    <div className="container">
      <p>
          Welcome!{" "}
          <span className="user-name">{user?.name}</span>
        </p>
        <h1>Welcome to my profile!</h1>
        <button onClick={() => onToast()}>Toast</button>
    </div>
  )
}

export default Profile
