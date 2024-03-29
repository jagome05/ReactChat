import React, { useEffect, useState, useCallback } from "react";

export default function ChatSelect({ active, setActive }) {
  const [listRooms, setListRooms] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const mongoDB = "http://localhost:4000/room/all";

  const handleCreateRoom = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        const res = await fetch("http://localhost:4000/room/new", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            description,
          }),
        });
        const data = await res.json();
        console.log(data); // Log the response from the server
        // Optionally, you can update the UI or perform any other action based on the response
      } catch (err) {
        console.error("Error creating room:", err);
      }
    },
    [name, description]
  );

  useEffect(() => {
    async function grabRooms() {
      try {
        let response = await fetch(mongoDB);
        let data = await response.json();
        let { allRooms } = data;
        setListRooms(allRooms);
      } catch (err) {
        console.log(err);
      }
    }
    grabRooms();
  }, [handleCreateRoom]);

  function handleOnClick(event) {
    let result = event.target.value;
    setActive(result);
  }

  function handleGoHome() {
    setActive(null); // Set active chat room to null to indicate leaving the room
  }

  return (
    <>
      <div className="chatSelect">
        {/* Home button */}
        <h1>Available Chats</h1>
        <button className="home-button" onClick={handleGoHome}>
          Home
        </button>
        {listRooms.map((room) => (
          <button
            className="button-layout"
            key={room._id}
            onClick={handleOnClick}
            value={room._id}
          >
            {room.name}
          </button>
        ))}{" "}
        {/* Add create-room-container class */}
        <form className="create-room-box" onSubmit={handleCreateRoom}>
          {/* Input field for entering room name */}
          <input
            className="create-room-input"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)} // Update name state on input change
          />
          {/* Input field for entering room description */}
          <input
            className="create-room-input"
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)} // Update description state on input change
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleCreateRoom();
              }
            }}
          />
          {/* Submit button for creating room */}
          <button className="create-room-button" type="submit">
            Create Room
          </button>
        </form>
      </div>
    </>
  );
}
