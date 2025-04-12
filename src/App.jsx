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
import FilterChoose from "./components/dashbord/FilterChoose";
import PrintMajors from "./components/dashbord/PrintMajors";
import PanelMajor from "./components/PanelMajor";
function App() {
  return (
    <>
      <BrowserRouter>
        {/* <Navbar /> */}
        <Routes>
          <Route
            path="/"
            element={
              <>
                {" "}
                <Navbar />
                <Home />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {" "}
                <Navbar />
                <Login />
              </>
            }
          />
          <Route
            path="/signup"
            element={
              <>
                {" "}
                <Navbar />
                <Signup />
              </>
            }
          />
          <Route
            path="/dashboard"
            element={
              <>
                <Panel />
              </>
            }
          />

          <Route
            path="/filtering"
            element={
              <>
                <FilterChoose />
              </>
            }
          />

          <Route
            path="/panel/major"
            element={
              <>
                <PanelMajor />
              </>
            }
          />
          <Route
            path="/print"
            element={
              <>
                <PrintMajors />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
