// LogoutButton.jsx
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // 🔑 Remove JWT token
    navigate("/login"); // 🔄 Redirect to login page
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 w-[120px] h-[50px]  text-white px-4 py-2 rounded hover:bg-red-600"
    >
      Logout
    </button>
 
  );
};

export default LogoutButton;
