import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import RoomsPage from "./pages/RoomsPage";

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="rooms/*" element={<RoomsPage />}></Route>
        <Route path="about" element={<h1>A propos</h1>}></Route>
        <Route path="Contact" element={<h1>Contact</h1>}></Route>
        <Route path="*" element={<h1>Not found 404</h1>}></Route>
      </Routes>
    </Layout>
  );
};

export default App;
