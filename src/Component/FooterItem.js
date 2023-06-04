import { useState } from "react";
import { FooterList } from "./FooterList";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FooterItem = (props) => {
  const [open, setOpen] = useState(false);

  const showDropdown = () => {
    setOpen(!open);
  };

  return (
    <li onClick={showDropdown} className="menu-head p-5 flex flex-col relative">
      <h2 className="text-xl font-semibold mb-5">{props.val}</h2>
      <button className={`absolute right-16 top-2 drop-btn`}>
        <FontAwesomeIcon
          className={`drop-btn ${open ? "arrow-down" : "arrow-up"}`}
          icon={faAngleDown}
        />
      </button>
      <ul
        className={`menu-item relative px-1 gap-y-5 ${
          open ? "open-list" : "close-list"
        }`}
      >
        <FooterList title={props.title} />
      </ul>
    </li>
  );
};
export default FooterItem;
