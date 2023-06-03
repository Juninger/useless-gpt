import { Fragment, useRef, useState, useEffect } from "react";
import ChatInput from "./Components/ChatInput";
import SiteHeader from "./Components/SiteHeader";
import UserMessage from "./Components/UserMessage";
import BotMessage from "./Components/BotMessage";
import axios from 'axios';
import anime from 'animejs';

function Chat() {

  const inputRef = useRef();
  const [userMessages, setUserMessages] = useState([]); //consider this 'questions'
  const [botMessages, setBotMessages] = useState([]); //consider this 'answers'

  const userMessageRef = useRef(null);
  const botMessageRef = useRef(null);

  useEffect(() => {
    if (userMessages.length > 0) {
      anime({
        targets: userMessageRef.current,
        opacity: [0, 1],
        translateX: [-20, 0],
        duration: 500,
        easing: "easeOutQuad",
      });
    }

    if (botMessages.length > 0) {
      anime({
        targets: botMessageRef.current,
        opacity: [0, 1],
        translateX: [-20, 0],
        duration: 500,
        easing: "easeOutQuad",
      });
    }

  }, [userMessages]);

  function addMessage(message) {

    getKanyeQuote()
      .then((resp) => { //TODO: Error handling

        const newBotMessage = {
          text: resp,
          author: 'Kanye West',
          url: 'https://github.com/ajzbc/kanye.rest/blob/master/quotes.json',
          source: 'source'
        }

        setBotMessages([...botMessages, newBotMessage]);
        /*
        make sure to always update userMessage last, as this will trigger 
        a re-render and needs botmessage to be ready
        */
        setUserMessages([...userMessages, message]);
      });

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

          {userMessages.map((message, index) => (
            <Fragment key={message.text + botMessages[index].text}>
              <UserMessage key={index + message.text} message={message} alo={userMessageRef} />
              <BotMessage key={index + botMessages[index].text} message={botMessages[index]} alo={botMessageRef} />
            </Fragment>
          ))}
        </div>

        <ChatInput onSend={addMessage}></ChatInput>

      </div>

    </>
  );
}

export default Chat;
