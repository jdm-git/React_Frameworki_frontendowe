import useDropdown from "react-dropdown-hook";
import DropdownMenuComponent from "../dropdown-menu/dropdownMenu.component";
import { Link } from "react-router-dom";

import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import NotificationsIcon from "@material-ui/icons/Notifications";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import logo from "../../assets/images/logo.png";
import "./NavBar.scss";

const NavBar = () => {
  const [wrapperRef, dropdownOpen, toggleDropdown] = useDropdown();

  const menuHandler = () => toggleDropdown();

  return (
    <nav>
      <div className="logo-icon-container">
        <div className="image-container">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div className="menu" ref={wrapperRef}>
          <div className="icon-container" onClick={menuHandler}>
            <HomeIcon />
            <span>Home</span>
          </div>
          <KeyboardArrowDownIcon onClick={menuHandler} />
          {dropdownOpen && <DropdownMenuComponent />}
        </div>
      </div>
      <div className="input-container">
        <input type="text" placeholder="Search Legalcluster" />
        <SearchIcon className="search" />
      </div>

      <div className="icons-container">
        <HomeIcon />
        <div>
          <NotificationsIcon />
          <div className="notifications">
            <span>99+</span>
          </div>
        </div>
        <div>
          <QuestionAnswerIcon />
          <div className="notifications">
            <span>2</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
