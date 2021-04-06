import ImageUploader from "../components/ImageUploader";
import { IsAuthenticated } from "../components/isAuthenticated/IsAuthenticated";

const UploadImage = () => {
  return <IsAuthenticated Component={ImageUploader} />;
};

export default UploadImage;
