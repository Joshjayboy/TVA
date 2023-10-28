import React from "react";
import { BsFillGridFill } from "react-icons/bs";
import { FaListAlt, FaUsers, FaHeart } from "react-icons/fa";
import {
  RiLockPasswordLine,
  RiLogoutCircleLine,
  RiMovie2Fill,
} from "react-icons/ri";
import { HiViewGridAdd } from "react-icons/hi";
import { FiSettings } from "react-icons/fi";
import Layout from "../../Layout/Layout";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutAction } from "../../Redux/Actions/userActions";
import { toast } from "react-hot-toast";

function SideBar({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.userLogin);

  // logout function
  const logOutHandler = () => {
    dispatch(logoutAction());
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const SideLinks = userInfo?.isAdmin
    ? [
        {
          name: "Dashboard",
          link: "/dashboard",
          icon: BsFillGridFill,
        },
        {
          name: "Companie's List",
          link: "/movieslist",
          icon: FaListAlt,
        },
        {
          name: "Add Companies",
          link: "/addmovie",
          icon: RiMovie2Fill,
        },
        {
          name: "Categories",
          link: "/categories",
          icon: HiViewGridAdd,
        },

        {
          name: "Users",
          link: "/users",
          icon: FaUsers,
        },
        {
          name: "Update Profile",
          link: "/profile",
          icon: FiSettings,
        },

        {
          name: "Favourites Company",
          link: "/favorites",
          icon: FaHeart,
        },

        {
          name: "Change Password",
          link: "/password",
          icon: RiLockPasswordLine,
        },
      ]
    : userInfo
    ? [
        {
          name: "Update Profile",
          link: "/profile",
          icon: FiSettings,
        },

        {
          name: "Favorite Company",
          link: "/favorites",
          icon: FaHeart,
        },

        {
          name: "Change Password",
          link: "/password",
          icon: RiLockPasswordLine,
        },
      ]
    : [];

  const active = "bg-dryGray text-primary";
  const hover = "hover:text-white hover:bg-main";
  const inActive =
    "rounded font-medium text-sm transitions flex gap-3 items-center p-4";
  const Hover = ({ isActive }) =>
    isActive ? `${active} ${inActive}` : `${inActive} ${hover}`;

  return (
    <Layout>
      <div className="min-h-screen container mx-auto px-2">
        <div className="xl:grid grid-cols-8 gap-10 items-start md:py-12 py-6">
          <div className="col-span-2 sticky bg-text border border-gray-800 p-6 rounded-md xl:mb-0 mb-5">
            {
              // sidebar Links
              SideLinks.map((link, index) => (
                <NavLink to={link.link} key={index} className={Hover}>
                  <link.icon /> <p>{link.name}</p>
                </NavLink>
              ))
            }

            <button
              onClick={logOutHandler}
              className={`${inActive} ${hover} w-full`}
            >
              <RiLogoutCircleLine /> Log Out
            </button>
          </div>
          <div
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="10"
            data-aos-offset="200"
            className="col-span-6 rounded-md bg-text border border-gray-800 p-6"
          >
            {children}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default SideBar;
