import { useRef, useState } from "react";
import ChatInput from "./Components/ChatInput";
import SiteHeader from "./Components/SiteHeader";
import UserMessage from "./Components/UserMessage";
import BotMessage from "./Components/BotMessage";

function Chat() {

  const inputRef = useRef();
  const [messages, setMessages] = useState([]);

  function addMessage() {
    setMessages([...messages, "A new message"]);
  };



  return (
    <>
      <div className="container bg-dark-subtle w-85 mt-4 pt-5" style={{ minHeight: "95vh", display: "flex", flexDirection: "column" }}>
        <SiteHeader />

        <div id="chat-container" className="container overflow-auto" style={{ maxHeight: "calc(95vh - 150px)" }}>
          {/* Example of message-style below */}
          <UserMessage></UserMessage>
          
          <hr />

          {/* Example of how to render messages below */}
          <BotMessage></BotMessage>
          {/* {messages.map((message) => (
            
          ))} */}
        </div>

        <ChatInput onSend={addMessage}></ChatInput>

      </div>

    </>
  );
}

export default Chat;
