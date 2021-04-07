import "./styles/Image.css";
import { Link } from "react-router-dom";

const Image = ({ src, alt, id }) => {
  return (
    <figure className="image-container">
      <Link to={`/image/${id}`}>
        <img src={src} alt={alt} />
      </Link>
    </figure>
  );
};

export default Image;
