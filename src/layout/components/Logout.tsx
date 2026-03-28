import { useNavigate } from "react-router";
import { Button } from "../../components/Button";
import { MdLogout } from "react-icons/md";

const Logout = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    console.log("user is log out");
    navigate("");
  };
  return (
    <Button variant="secondary" label="Logout" onClick={handleLogout}>
      {" "}
      <MdLogout />
    </Button>
  );
};

export default Logout;
