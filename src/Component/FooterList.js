import axios from "axios";
import { useEffect, useState } from "react";

export const FooterList = (props) => {
  const [footerData, setFooterData] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/footerMenu?title=${props.title}`)
      .then((response) => {
        setFooterData(response.data[0].content);
      });
  }, []);

  return footerData.map((val, i) => {
    return (
      <>
        <li className="menu-data mb-3" key={i}>
          <a href={val.link}>{val.subtitle}</a>
        </li>
      </>
    );
  });
};
