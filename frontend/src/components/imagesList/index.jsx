//--Imports
import "./styles/ImagesList.css";
import { useState, useEffect } from "react";
import { getImages } from "../../services/imagesCrud";
import Image from "./Image";

const ImagesList = () => {
  //..States
  const [images, setImages] = useState([]);

  //...Getting images
  useEffect(() => {
    const abortController = new AbortController();

    getImages()
      .then((res) => setImages(res.data))
      .catch((err) => console.log(err));

    return () => abortController.abort();
  }, []);

  //...Render
  return (
    <div id="images-list" className="container">
      {images.map((image) => (
        <Image
          key={image._id}
          src={`http://localhost:4000/${image.storage_name}`}
          alt={image.title}
          id={image._id}
        />
      ))}
    </div>
  );
};

//--Export
export default ImagesList;
