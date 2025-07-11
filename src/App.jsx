import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import "@coreui/coreui-pro/dist/css/coreui.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "normalize.css";
import "./App.css";
import "./output.css";

import Navbar from "./components/Navbar";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import Panel from "./components/Panel";
import FilterChoose from "./components/dashbord/FilterChoose";
import PrintMajors from "./components/dashbord/PrintMajors";
import PanelMajor from "./components/PanelMajor";
import Loading from "./components/Loading";
import LoginMajor from "./components/LoginMajor";
import AuthProvider from "./AuthProvider";

function App() {
  const [loading, setLoading] = useState(false);

  return (
    <BrowserRouter>
      <AuthProvider setLoading={setLoading}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Home />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <Navbar />
                <Login />
              </>
            }
          />
          <Route
            path="/signup"
            element={
              <>
                <Navbar />
                <Signup />
              </>
            }
          />
          <Route path="/dashboard" element={<Panel />} />
          <Route path="/filtering" element={<FilterChoose />} />
          <Route path="/major/login" element={<LoginMajor />} />
          <Route path="/major/panel" element={<PanelMajor />} />
          <Route path="/print" element={<PrintMajors />} />
        </Routes>
      </AuthProvider>
      {loading && <Loading />}
    </BrowserRouter>
  );
}

export default App;
