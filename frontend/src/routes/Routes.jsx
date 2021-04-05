import { Route, Switch } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import SingleImage from "../pages/SingleImage";
import UploadImage from "../pages/UploadImage";
import UpdateImage from "../pages/UpdateImage";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/upload" component={UploadImage} />
      <Route exact path="/update/:id" component={UpdateImage} />
      <Route exact path="/image/:id" component={SingleImage} />
    </Switch>
  );
};

export default Routes;
