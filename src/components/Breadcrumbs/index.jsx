import "./module.css";

import { Link } from "react-router-dom";

const Breadcrumbs = (prop) => {
  const { linkList } = prop;

  return (
    <ul className='breadcrumb'>
      {linkList.map((link, index) => {
        return (
          <li key={index}>
            <Link to={link.to}>{link.label}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Breadcrumbs;
