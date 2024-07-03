import React, { useEffect, useState } from "react";
import MessageBar from "./MessageBar";
import MessageLayout from "./MessageLayout";
const BASE_URL = process.env.BASE_URL

export default function Chatroom({ active, setActive }) {
  let currentRoom = active;
  let currentRoomURL = `${BASE_URL}/room/${currentRoom}`;
  let [roomInfo, setRoomInfo] = useState("");

  useEffect(() => {
    async function grabCurrentRoom() {
      try {
        let res = await fetch(currentRoomURL);
        let data = await res.json();
        let foundRoom = data.room;
        setRoomInfo(foundRoom);
      } catch (err) {
        console.log(err);
      }
    }
    grabCurrentRoom();
  }, [active]);

  let { name, description } = roomInfo;

  return (
    <>
    <div className="ChatLayout">
      <div className="chat-header">
        <h2 className="room-name">{name}</h2>
        <p className="room-description">{description}</p>{" "}
      </div>
      <div className="chatRoom">
        {/* Render room description */}
        <MessageLayout active={active} />
      </div>
    </div>
    </>
  );
}
