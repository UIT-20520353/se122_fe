import React, { Fragment, useRef, useState } from "react";
import { AiOutlineMessage } from "react-icons/ai";
import { FiLogOut, FiUser } from "react-icons/fi";
import { IoNotificationsOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useOnClickOutside } from "usehooks-ts";
import authApi from "../../api/authApi";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import default_avatar from "../../assets/images/avatar.png";
import logo from "../../assets/images/logo.png";
import { logout, selectProfile, setLoading } from "../../redux/globalSlice";
import { useHandleResponseError } from "../../hooks/useHandleResponseError";
import Chat from "../../features/chat/pages";

interface HeaderProps {}

const Header: React.FunctionComponent<HeaderProps> = () => {
  const dispatch = useAppDispatch();
  const handleResponseError = useHandleResponseError();
  const navigate = useNavigate();
  const profile = useAppSelector(selectProfile);

  const userProfileRef = useRef<HTMLDivElement>(null);
  const [isShowProfileMenu, setIsShowProfileMenu] = useState<boolean>(false);
  const [isShowChatPage, setIsShowChatPage] = useState<boolean>(false);

  const onClickOutside = () => {
    setIsShowProfileMenu(false);
  };

  useOnClickOutside(userProfileRef, onClickOutside);

  const handleLogout = async () => {
    dispatch(setLoading("ADD"));
    const { error, ok } = await authApi.logout();
    dispatch(setLoading("REMOVE"));
    if (!ok) {
      handleResponseError(error);
      dispatch(logout());
      navigate("/login");
      return;
    }
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Fragment>
      <div className="header">
        <Link to={"/"} className="header__logo header__left">
          <img className="logo" src={logo} alt="logo" />
          <div className="website-name">
            <p>Ielts Tinder</p>
            <p>Communication</p>
          </div>
        </Link>

        <div className="header__right">
          <div className="header__actions">
            <IoNotificationsOutline className="header__icon" />
            <AiOutlineMessage
              className="header__icon have__noti"
              onClick={() => setIsShowChatPage(true)}
            />
          </div>
          <div className="header__profile" ref={userProfileRef}>
            <div
              className="user-detail"
              onClick={() => setIsShowProfileMenu(true)}
            >
              <p>
                Hello,
                <span>{` ${profile?.firstName || ""} ${
                  profile?.lastName || ""
                }`}</span>
              </p>
              <p>User</p>
            </div>
            <img
              className="avatar"
              src={default_avatar}
              alt="avatar"
              onClick={() => setIsShowProfileMenu(true)}
            />

            <div
              className={`dropdown-menu ${
                isShowProfileMenu ? "flex" : "hidden"
              }`}
            >
              <div className="dropdown-menu__item">
                <FiUser className="text-blue font-20" />
                <p>Profile</p>
              </div>
              <div className="dropdown-menu__item" onClick={handleLogout}>
                <FiLogOut className="text-red font-20" />
                <p>Logout</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Chat
        isOpen={isShowChatPage}
        closeModal={() => setIsShowChatPage(false)}
      />
    </Fragment>
  );
};

export { Header };
