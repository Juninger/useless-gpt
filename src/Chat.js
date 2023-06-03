import { useRef, useState } from "react";
import ChatInput from "./Components/ChatInput";
import SiteHeader from "./Components/SiteHeader";
import UserMessage from "./Components/UserMessage";
import BotMessage from "./Components/BotMessage";
import axios from 'axios';

function Chat() {

  const inputRef = useRef();
  const [messages, setMessages] = useState([]);

  function addMessage(message) {
    console.log(message);
    setMessages([...messages, message]);

    getKanyeQuote()
      .then((resp) => { //TODO: Error handling
        console.log(resp);
      })

  };

  function getKanyeQuote() {

    return axios.get('https://api.kanye.rest') //TODO: Error handling
      .then((response) => {
        const quote = response.data.quote;
        return quote;
      });
  }



  return (
    <>
      <div className="container bg-dark-subtle w-85 mt-4 pt-5" style={{ minHeight: "95vh", display: "flex", flexDirection: "column" }}>
        <SiteHeader />

        <div id="chat-container" className="container overflow-auto" style={{ maxHeight: "calc(95vh - 150px)" }}>
          {/* Example of message-style below */}

          <hr />

          {/* Example of how to render messages below */}
          <BotMessage></BotMessage>
          {messages.map((message) => (
            <UserMessage key={message.text + message.timestamp} message={message}></UserMessage>
          ))}
        </div>

        <ChatInput onSend={addMessage}></ChatInput>

      </div>

    </>
  );
}

export default Chat;
