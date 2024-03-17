import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [userDetails, setUserDetails]: any = useState({});

  const navigate = useNavigate();

  const getProfile = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const response = await axios.get(
        "http://localhost:8000/users/my-profile",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setUserDetails(response.data.data);
    } catch (e) {}
  };

  // Protected route...
  useEffect(() => {
    const getAccessToken = localStorage.getItem("accessToken");
    if (!getAccessToken) {
      navigate("/login");
    }
    getProfile();
  }, []);

  return (
    <>
      <div className="p-10">
        Welcome {userDetails.name}
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
