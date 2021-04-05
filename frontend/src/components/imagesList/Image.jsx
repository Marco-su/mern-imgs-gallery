import { Link } from "react-router-dom";

const Image = ({ src, alt, id }) => {
  return (
    <figure>
      <Link to={`/image/${id}`}>
        <img src={src} alt={alt} />
      </Link>
    </figure>
  );
};

export default Image;
