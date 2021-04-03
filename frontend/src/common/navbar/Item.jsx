import { Link } from "react-router-dom";

const Item = ({ text, to }) => {
  return (
    <li className="nav-item">
      <Link className="nav-link" to={to}>
        {text}
      </Link>
    </li>
  );
};

export default Item;
