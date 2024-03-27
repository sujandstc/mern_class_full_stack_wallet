import { Popconfirm, Popover } from "antd";
import { useNavigate } from "react-router-dom";

const Header = ({ userDetails }: any) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-gradient-to-r from-indigo-500 to-red-400 p-5 text-white font-bold">
        <div className="flex justify-between items-center">
          <div>Welcome {userDetails.name}!</div>

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

export default Header;
