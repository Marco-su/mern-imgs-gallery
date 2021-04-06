//--Imports
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleImage } from "../../services/imagesCrud";
import Buttons from "./Buttons";

const SingleImage = ({ history }) => {
  //...States
  const [image, setImage] = useState([]);
  const { id } = useParams();

  //...Get image
  useEffect(() => {
    const abortController = new AbortController();

    getSingleImage(id)
      .then((res) => setImage(res.data))
      .catch((err) => console.log(err));

    return () => abortController.abort();
  }, [id]);

  //...Render
  return (
    <div className="container my-3">
      <h3>{image.title}</h3>
      <figure>
        <img
          src={image._id ? `http://localhost:4000/${image.storage_name}` : ""}
          alt={image.title ? image.title : ""}
        />
        <figcaption>{image.description}</figcaption>
      </figure>

      <Buttons />
    </div>
  );
};

//--Export
export default SingleImage;
