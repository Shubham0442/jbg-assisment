import { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";

function App() {
  const [text, setText] = useState("");

  const socket = io("http://localhost:5051");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to the server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from the server");
    });

    socket.on("chat message", (message) => {
      console.log(`Received message: ${message}`);

      if (message) setText(message);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = (message) => socket.emit("chat message", message);

  return (
    <div className="App">
      <h4>Click to send the message "Hello"</h4>
      <button onClick={() => sendMessage("Hello")}>send</button>
      <div>{text !== "" && text}</div>
    </div>
  );
}

export default App;
