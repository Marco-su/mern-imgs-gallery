//--Imports
import { useState } from "react";
import { withRouter } from "react-router-dom";

import { showPreview } from "../../services/showPreview";
import { createImage } from "../../services/imagesCrud";

const ImageUploader = ({ history }) => {
  //...States
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [pathImage, setPathImage] = useState(null);
  const [invalidImage, setInvalidImage] = useState(null);

  //...ImagePreview
  const showImagePreview = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      showPreview(file, setImage, setPathImage, setInvalidImage);
    }
  };

  //...Submit data
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!invalidImage) {
      //---Debo agregar validacion del token aqui

      createImage(title, description, image)
        .then((res) => {
          if (res.data.success) {
            const user = JSON.parse(window.localStorage.getItem("user"));

            user.images = res.data.images;
            window.localStorage.setItem("user", JSON.stringify(user));

            history.push(`/image/${res.data.newImageId}`);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  //...Render
  return (
    <div id="uploader" className="container my-3">
      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          type="file"
          onChange={showImagePreview}
          accept="image/*"
          required
        />

        <input
          className="form-control mb-2"
          type="text"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          className="form-control mb-2"
          rows="2"
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>

        {invalidImage ? (
          <span className="text-danger d-block mb-2">{invalidImage}</span>
        ) : null}

        <button className="btn btn-success d-block mb-2">Upload</button>

        <img src={pathImage} alt="Preview" />
      </form>
    </div>
  );
};

//--Export
export default withRouter(ImageUploader);
