//--Imports
import { useState, useEffect } from "react";
import { withRouter, useParams } from "react-router-dom";
import { deleteImage } from "../../services/imagesCrud";

const Buttons = ({ history }) => {
  const [isOwner, setIsOwner] = useState(false);
  const { id } = useParams();

  //...Delete image function
  const deleteThisImage = () => {
    if (!window.localStorage.getItem("auth")) return history.push("/login");

    deleteImage(id)
      .then((res) => {
        if (res.data.success) {
          const user = JSON.parse(window.localStorage.getItem("user"));
          user.images = user.images.filter((el) => el !== id);
          window.localStorage.setItem("user", JSON.stringify(user));
          return history.push("/");
        }
      })
      .catch((err) => console.log(err));
  };

  //...This user is owner or admin?
  useEffect(() => {
    const abortController = new AbortController();

    let user = null;
    window.localStorage.getItem("user")
      ? (user = JSON.parse(window.localStorage.getItem("user")))
      : (user = null);

    if (user && (user.images.includes(id) || user.isAdmin)) {
      setIsOwner(true);
    }

    return () => abortController.abort();
  }, [id]);

  //...Render
  return (
    <>
      {isOwner ? (
        <>
          <button className="btn btn-danger me-2" onClick={deleteThisImage}>
            Delete
          </button>

          <button
            className="btn btn-primary"
            onClick={() => history.push(`/update/${id}`)}
          >
            Edit
          </button>
        </>
      ) : null}
    </>
  );
};

//...Export
export default withRouter(Buttons);
