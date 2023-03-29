import React from "react";
import { Routes, Route } from "react-router-dom";
import Rooms from "../components/Rooms";
import Room from "../components/Room";
function RoomsPage() {
  return (
    <Routes>
      <Route path="/" element={<Rooms />}></Route>
      <Route path=":id" element={<Room />}></Route>
    </Routes>
  );
}

export default RoomsPage;
