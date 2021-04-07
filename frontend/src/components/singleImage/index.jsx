//--Imports
import "./styles/SingleImage.css";
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
    <div id="single-image" className="card">
      <div className="card-header bg-dark">
        <h3 className="text-white">{image.title}</h3>
      </div>
      <div className="card-body">
        <figure>
          <img
            src={image._id ? `http://localhost:4000/${image.storage_name}` : ""}
            alt={image.title ? image.title : ""}
          />
          <figcaption className="text-secondary">
            {image.description}
          </figcaption>
        </figure>
        <Buttons />
      </div>
    </div>
  );
};

//--Export
export default SingleImage;
