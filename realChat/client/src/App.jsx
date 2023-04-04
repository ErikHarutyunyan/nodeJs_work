import React, { useState } from "react";
import "./App.css";
import io from "socket.io-client";
import Chat from "./component/Chat";

const socket = io.connect("http://localhost:3001");

const App = () => {
  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinChat = () => {
    if (userName !== "" && room !== "") {
      socket.emit("join_chat", room);
      setShowChat(true);
    }
  };

  return (
    <>
      <div className="App">
        {!showChat ? (
          <>
            <h3>Chat</h3>
            <div className="joinChatContainer">
              <div className="joinChat">
                <input
                  type="text"
                  name="nameUser"
                  id="nameUser"
                  aria-label="nameUser"
                  placeholder="Tom..."
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                />
                <input
                  type="text"
                  name="nameClient"
                  id="nameClient"
                  aria-label="nameClient"
                  placeholder="Chat ID..."
                  onChange={(e) => {
                    setRoom(e.target.value);
                  }}
                />
              </div>
              <button onClick={joinChat}>Start Chat</button>
            </div>
          </>
        ) : (
          <Chat socket={socket} userName={userName} room={room} />
        )}
      </div>
      <div className="bg"></div>
    </>
  );
};

export default App;
