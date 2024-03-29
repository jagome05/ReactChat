import React, { useState, useEffect } from "react";

export default function MessageBar({ active }) {
  //! make sure to update with john's logged in user
  let [room, setRoom] = useState("");
  let [userInfo, setUserInfo] = useState({});
  let [author, setAuthor] = useState("");
  let [body, setBody] = useState("");

  // todo this will be used for updating the room and autthor for POST req
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setRoom(active);
    setUserInfo(user);
    setAuthor(user?._id);
  }, [active]);

  //this fxn handles the POST request when message is send
  function handleSend() {
    fetch("http://localhost:4000/api/postMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        room,
        author,
        body,
      }),
    })
      .then((res) => {
        if (res.ok) {
          // Reset input field after sending message
          setBody("");
        } else {
          throw new Error("Failed to send message");
        }
      })
      .catch((error) => {
        console.error("Error sending message:", error);
        // Handle error feedback to the user
      });
  }

  //this component is the send message container
  return (
    <>
      <div className="messageContainer">
        <h3>{userInfo.firstname}</h3>
        <input
          type="text"
          value={body} // Control input value with state
          onChange={(e) => {
            setBody(e.target.value);
          }}
          placeholder="send a message"
          name="body"
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </>
  );
}
