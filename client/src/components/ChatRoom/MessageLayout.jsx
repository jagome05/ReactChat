import React, { useEffect, useState } from "react";

export default function MessageLayout({ active }) {
  let [msgInfo, setMsgInfo] = useState([]);
  // let [userInfo, setUserInfo] = useState({})
  // let [body, setBody] = useState('')
  // let [activeEdit, setActiveEdit] = useState('')
  // let [activeDelete, setActiveDelete] = useState('')
  // let key;

  //grabs all messages and filters out tnly the ones in the active room
  useEffect(() => {
    async function grabAllMessages() {
      try {
        let res = await fetch("http://localhost:4000/api/allMessages");
        let data = await res.json();
        let matchRoom = data.messages;
        let results = matchRoom.filter((index) => index.room === active);
        setMsgInfo(results);
      } catch (err) {
        console.log(err);
      }
    }
    grabAllMessages();
  }, [msgInfo]);

  //todo ICEBOX add an edit/delete button on each message

  // function handleOnClick(info) {

  //   let user = JSON.parse(localStorage.getItem("user"))
  //   setUserInfo(user)

  //   if(userInfo._id === info.author) {
  //     console.log('yes')
  //   } else {
  //     console.log('no')
  //   }
  // }

  //this returns how the messages our dispalyed
  return (
    <>
      <div>
        {msgInfo.map((index) => (
          <div key={index._id} className={`message-chat`}>
            <h2>{index.authorName}</h2>
            <h3>
              {index.body} <span className="timestamp">{index.timestamp}</span>
            </h3>
          </div>
        ))}
      </div>
    </>
  );
}

//? ref
// https://stackoverflow.com/questions/59812291/cant-convert-objectid-to-string-in-javascript
// https://hackernoon.com/how-to-handle-hover-events-in-react
