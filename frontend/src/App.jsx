import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./common/navbar";
import Routes from "./routes/Routes";
import { MyProvider } from "./services/context";

function App() {
  return (
    <div className="App">
      <Router>
        <MyProvider>
          <Navbar />
          <Routes />
        </MyProvider>
      </Router>
    </div>
  );
}

export default App;
