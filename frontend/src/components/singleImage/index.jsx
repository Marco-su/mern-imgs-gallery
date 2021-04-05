//--Imports
import { useEffect, useState } from "react";
import { useParams, withRouter } from "react-router-dom";
import { getSingleImage, deleteImage } from "../../services/imagesCrud";

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

  //...Delete image
  const deleteThisImage = () => {
    //---Debo verificar token aquí
    //---Debo redireccionar luego de eliminar o mostrar mensaje

    deleteImage(id)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

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

      <button className="btn btn-danger me-2" onClick={deleteThisImage}>
        Delete
      </button>

      <button
        className="btn btn-primary"
        onClick={() => history.push(`/update/${id}`)}
      >
        Edit
      </button>
    </div>
  );
};

//--Export
export default withRouter(SingleImage);
