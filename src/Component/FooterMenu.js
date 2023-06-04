import { useState } from "react";
import FooterItem from "./FooterItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpotify,
  faFacebook,
  faPinterest,
  faInstagram,
  faYoutube,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
const FooterMenu = (props) => {
  return (
    <>
      <div className="dropdown-menu shadow-lg border-b-2 shadow-slate-300 ml-[40vw] px-12">
        <ul className="list-none border-b-2 mb-8">
          <FooterItem val={"About Us"} title={"About%20Us"} />
          <FooterItem val={"Careers"} title={"Careers"} />
          <FooterItem val={"Social Impact"} title={"Social%20Impact"} />
          <FooterItem
            val={"For Business Partners"}
            title={"For%20Business%20Partners"}
          />
          <FooterItem val={"Order and Pickup"} title={"Order%20and%20Pickup"} />
        </ul>
        <div className="social-icons mt-2">
          <ul className="flex flex-row">
            <li>
              <FontAwesomeIcon
                className="brand-icon mr-5 mb-4 "
                icon={faSpotify}
              />
            </li>
            <li>
              <FontAwesomeIcon
                className="brand-icon mr-5 mb-4"
                icon={faFacebook}
              />
            </li>
            <li>
              <FontAwesomeIcon
                className="brand-icon mr-5 mb-4"
                icon={faPinterest}
              />
            </li>
            <li>
              <FontAwesomeIcon
                className="brand-icon mr-5 mb-4"
                icon={faInstagram}
              />
            </li>
            <li>
              <FontAwesomeIcon
                className="brand-icon mr-5 mb-4"
                icon={faYoutube}
              />
            </li>
            <li>
              <FontAwesomeIcon
                className="brand-icon mr-5 mb-4"
                icon={faTwitter}
              />
            </li>
          </ul>
          <ul className="mt-2">
            <li className="font-semibold mb-4">
              <a>Privacy Notice </a>
            </li>
            <li className="font-semibold mb-4">
              <a>Terms of Use </a>
            </li>
            <li className="font-semibold mb-4">
              <a>Do Not Share My Personal Information </a>
            </li>
            <li className="font-semibold mb-4">
              <a> CA Supply Chain Act</a>
            </li>
            <li className="font-semibold mb-4">
              <a>Cookie Preferences </a>
            </li>
          </ul>
        </div>
        <p className="menu-data mt-12 mb-32">
          © 2022 Starbucks Coffee Company. All rights reserved.
        </p>
      </div>
    </>
  );
};

export default FooterMenu;
