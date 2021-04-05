import axios from "axios";

const url = "http://localhost:4000/images";
const auth = window.localStorage.getItem("auth");

//--Get images
export const getImages = () => {
  return axios({
    url,
  });
};

//--Create new image
export const createImage = (title, description, file) => {
  const form = new FormData();
  form.append("title", title);
  form.append("description", description);
  form.append("image", file);

  return axios({
    url,
    method: "POST",
    data: form,
    headers: { "x-access-token": auth },
  });
};

//--Get single image
export const getSingleImage = (id) => {
  return axios({
    url: `${url}/${id}`,
  });
};

//--Update Image
export const updateImage = (title, description, id) => {
  return axios({
    url: `${url}/${id}`,
    method: "PUT",
    data: { title, description },
    headers: { "x-access-token": auth },
  });
};

//--Delete image
export const deleteImage = (id) => {
  return axios({
    url: `${url}/${id}`,
    method: "DELETE",
    headers: { "x-access-token": auth },
  });
};
