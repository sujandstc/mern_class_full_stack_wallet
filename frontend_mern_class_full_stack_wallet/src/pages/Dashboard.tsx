import { Button, Popconfirm, Popover } from "antd";
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
      <div className="bg-gradient-to-r from-indigo-500 to-red-400 p-5 text-white font-bold">
        <div className="flex justify-between items-center">
          <div>Welcome {userDetails.name},</div>

          <Popover
            content={
              <>
                <hr />
                <Popconfirm
                  title="Logout"
                  description="Are you sure to logout?"
                  onConfirm={() => {
                    localStorage.removeItem("accessToken");
                    navigate("/login");
                  }}
                  showCancel={false}
                  okText="Logout"
                  okButtonProps={{ danger: true }}
                >
                  <div className="p-1 cursor-pointer">Logout</div>
                </Popconfirm>
              </>
            }
            title={userDetails.name}
            trigger="click"
          >
            <div className=" bg-gray-700 p-3 rounded-full h-[35px] w-[35px] flex items-center text-white cursor-pointer">
              {userDetails && userDetails.name ? userDetails.name[0] : ""}
            </div>
          </Popover>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
