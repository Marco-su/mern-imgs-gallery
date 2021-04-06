import ImageUpdate from "../components/imageUpdate";
import { IsAuthenticated } from "../components/isAuthenticated/IsAuthenticated";

const UpdateImage = () => {
  return <IsAuthenticated Component={ImageUpdate} />;
};

export default UpdateImage;
