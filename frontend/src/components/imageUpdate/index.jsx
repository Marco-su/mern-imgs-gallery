//--Imports
import { useState, useEffect } from "react";
import { useParams, withRouter } from "react-router-dom";
import { getSingleImage, updateImage } from "../../services/imagesCrud";

const ImageUpdate = ({ history }) => {
  //...States
  const { id } = useParams();
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  //...Get image info
  useEffect(() => {
    const abortController = new AbortController();

    getSingleImage(id)
      .then((res) => {
        setImage(res.data);
        setTitle(res.data.title);
        setDescription(res.data.description);
      })
      .catch((err) => console.log(err));

    return () => abortController.abort();
  }, [id]);

  //...Update function
  const handleSubmit = (e) => {
    e.preventDefault();

    updateImage(title, description, id)
      .then((res) => {
        if (res.data.success) history.push(`/images/${id}`);
      })
      .catch((err) => console.log(err));
  };

  //...Render
  return (
    <div id="image-update" className="container my-3">
      {image ? (
        <>
          <h2>Update</h2>

          <form onSubmit={handleSubmit}>
            <input
              className="form-control mb-2"
              type="text"
              placeholder="Title"
              defaultValue={image.title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              className="form-control mb-2"
              rows="2"
              placeholder="Description"
              defaultValue={image.description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            <button className="btn btn-success">Update</button>
          </form>
        </>
      ) : (
        <span>Loading</span>
      )}
    </div>
  );
};

//---Export
export default withRouter(ImageUpdate);
