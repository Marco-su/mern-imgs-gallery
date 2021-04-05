//--Imports
import { useState } from "react";
import { showPreview } from "../../services/showPreview";
import { createImage } from "../../services/imagesCrud";

const ImageUploader = () => {
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
      //---Debo configurar el backend para que me mande el id del a imagen para redireccionar al usuario

      createImage(title, description, image)
        .then((res) => console.log(res))
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
        />

        <input
          className="form-control mb-2"
          type="text"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="form-control mb-2"
          rows="2"
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
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
export default ImageUploader;
