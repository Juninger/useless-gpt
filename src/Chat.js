import { Fragment, useRef, useState, useEffect } from "react";
import ChatInput from "./Components/ChatInput";
import SiteHeader from "./Components/SiteHeader";
import UserMessage from "./Components/UserMessage";
import BotMessage from "./Components/BotMessage";
import axios from 'axios';

function Chat() {

  const [userMessages, setUserMessages] = useState([]); //consider this 'questions'
  const [botMessages, setBotMessages] = useState([]); //consider this 'answers'

  const chatContainerRef = useRef(null);

  // Automatically scrolls to bottom when a new message is added
  useEffect(() => {
    if (userMessages.length > 0) {
      const chatContainer = chatContainerRef.current;
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [userMessages]);

  // Called from ChatInput component when user sends a new message
  // TODO: Update with logic to randomize which API that should be called to GET an answer
  function addMessage(message) {

    getKanyeQuote()
      .then((resp) => { //TODO: Error handling

        const newBotMessage = {
          text: resp,
          author: 'Kanye West',
          url: 'https://github.com/ajzbc/kanye.rest/blob/master/quotes.json',
          source: 'source'
        }

        setUserMessages((prevMess) => [...prevMess, message]);
        setBotMessages((prevMess) => [...prevMess, newBotMessage]);

        /*
        make sure to always update userMessage last, as this will trigger 
        a re-render and needs botmessage to be ready
        */
      });

  };

  // Called to retrieve a random Kanye West quote 
  function getKanyeQuote() {

    return axios.get('https://api.kanye.rest') //TODO: Error handling
      .then((response) => {
        const quote = response.data.quote;
        return quote;
      });
  }

  return (
    <>
      <div className="container bg-dark-subtle mt-4 pt-5" style={{ minHeight: "95vh", display: "flex", flexDirection: "column" }}>
        <SiteHeader />

        <div id="chat-container" ref={chatContainerRef} className="overflow-x-hidden p-3" style={{ maxHeight: "calc(95vh - 150px)", width: "100%" }}>
          {userMessages.map((message, index) => (
            <Fragment key={message.text + botMessages[index].text}>
              <UserMessage key={index + message.text} message={message} />
              <BotMessage
                key={index + botMessages[index].text}
                message={botMessages[index]}
                last={index === botMessages.length-1} // If final element, we handle rendering & animations differently
              />
            </Fragment>
          ))}
        </div>

        <ChatInput onSend={addMessage}></ChatInput>
      </div>
    </>
  );
}

export default Chat;
