import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import RoomsPage from "./pages/RoomsPage";
import AuthContext from "./context/AuthContext";

function Router() {
  const { loggedIn } = useContext(AuthContext);

  console.log("logged in222 : ", loggedIn);

  return (
    <Layout>
      <Routes>
        {loggedIn === true && (
          <>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="rooms/*" element={<RoomsPage />}></Route>
            <Route path="about" element={<h1>A propos</h1>}></Route>
            <Route path="Contact" element={<h1>Contact</h1>}></Route>
            <Route path="*" element={<h1>Not found 404</h1>}></Route>
          </>
        )}

        {loggedIn === false && (
          <>
            <Route path="Inscription" element={<Register />}></Route>
            <Route path="login" element={<Login />}></Route>
          </>
        )}
      </Routes>
    </Layout>
  );
}

export default Router;
