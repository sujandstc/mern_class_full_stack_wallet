import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  // Protected route...
  useEffect(() => {
    const getAccessToken = localStorage.getItem("accessToken");
    if (!getAccessToken) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <div className="p-10">
        This is dashboard!
        <br />
        <br />
        <br />
        <br />
        <a
          onClick={() => {
            localStorage.removeItem("accessToken");
            navigate("/login");
          }}
        >
          Logout
        </a>
      </div>
    </>
  );
};

export default Dashboard;
