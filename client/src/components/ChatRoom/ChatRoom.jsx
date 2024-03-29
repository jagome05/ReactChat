import React, { useEffect, useState } from "react";
import MessageBar from "./MessageBar";
import MessageLayout from "./MessageLayout";

//accepts the props active to see which room is active
export default function Chatroom({ active, setActive }) {
  let currentRoom = active;
  let currentRoomURL = `http://localhost:4000/room/${currentRoom}`;
  let [roomInfo, setRoomInfo] = useState("");

  //useEffect to grab API call for active room
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

  let { name } = roomInfo;

  //this returns layout for the chat messages
  return (
    <>
      <div className="chatRoom">
        <h2>{name}</h2>
        <MessageLayout active={active} />
        <MessageBar active={active} />
      </div>
    </>
  );
}
