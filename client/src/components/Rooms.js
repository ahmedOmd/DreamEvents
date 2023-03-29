import React, { useState, useEffect } from "react";
import RoomCard from "./RoomCard";
import { Link } from "react-router-dom";
function Rooms() {
  // recuperation des données , rooms -> nos données, setRooms -> fonction qui va MAJ nos données , regroupées dans un tableau
  const [rooms, setRooms] = useState([]);

  // fonction qui recup les données quand le composant est monté
  useEffect(() => {
    const fetchData = async () => {
      const data = await window.fetch("/api/rooms"); // données brutes qui ne sont pas utilisables
      const json = await data.json(); //on les passe en JSONv
      setRooms(json); // on met à jour le tableau rooms avec les données récupérées
    };
    fetchData();
  }, []);

  return (
    <>
      {rooms.map((room) => (
        <Link key={room._id} to={room._id}>
          <RoomCard room={room}></RoomCard>
        </Link>
      ))}
    </>
  );
}

export default Rooms;
