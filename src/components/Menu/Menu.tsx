import React from "react";
import "./Menu.style.css";

interface IMenuProps {}

const Menu: React.FunctionComponent<IMenuProps> = () => {
  return (
    <div className="homeWrapper">
      <div className="d-flex align-items-start">
        <div
          className="nav flex-column nav-pills me-3"
          id="v-pills-tab"
          role="tablist"
          aria-orientation="vertical"
        >
          <button
            className="nav-link active customMenuItem"
            id="v-pills-home-tab"
            data-bs-toggle="pill"
            data-bs-target="#v-pills-home"
            type="button"
            role="tab"
            aria-controls="v-pills-home"
            aria-selected="false"
          >
            Home
          </button>
          <button
            className="nav-link customMenuItem"
            id="v-pills-profile-tab"
            data-bs-toggle="pill"
            data-bs-target="#v-pills-profile"
            type="button"
            role="tab"
            aria-controls="v-pills-profile"
            aria-selected="false"
          >
            Calendar
          </button>
          <button
            className="nav-link customMenuItem"
            id="v-pills-disabled-tab"
            data-bs-toggle="pill"
            data-bs-target="#v-pills-disabled"
            type="button"
            role="tab"
            aria-controls="v-pills-disabled"
            aria-selected="false"
          >
            Matching
          </button>
          <button
            className="nav-link customMenuItem"
            id="v-pills-settings-tab"
            data-bs-toggle="pill"
            data-bs-target="#v-pills-settings"
            type="button"
            role="tab"
            aria-controls="v-pills-settings"
            aria-selected="false"
          >
            Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Menu;
