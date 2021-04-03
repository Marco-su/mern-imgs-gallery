import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./common/navbar/Navbar";
import Routes from "./routes/Routes";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes />
      </Router>
    </div>
  );
}

export default App;
