require("dotenv").config();
import React, { useState } from "react";
import ChatSelect from "./ChatRoom/ChatSelect";
import ChatRoom from "./ChatRoom/ChatRoom";
import "./ChatRoom/styles.css";
import MessageBar from "./ChatRoom/MessageBar";

function Home() {
  let [roomActive, setRoomActive] = useState("");

  if (roomActive) {
    return (
      <>
        <div className="chatWrapper">
          <ChatSelect active={roomActive} setActive={setRoomActive} />
          <ChatRoom active={roomActive} setActive={setRoomActive} />
          <MessageBar active={roomActive} setActive={setRoomActive} />
        </div>
      </>
    );
  }
  return (
    <div className="chatWrapper">
      <ChatSelect active={roomActive} setActive={setRoomActive} />
      <h1>Please select a Chat on the left!</h1>
    </div>
  );
}

export default Home;
