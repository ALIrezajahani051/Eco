import "./App.css";
import "@coreui/coreui-pro/dist/css/coreui.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./output.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Navbar from "./components/Navbar";
import "normalize.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import Panel from "./components/Panel";

function App() {
  return (
    <>
      <BrowserRouter>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              <>
                <Panel />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
