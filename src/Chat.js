import { Fragment, useRef, useState, useEffect } from "react";
import ChatInput from "./Components/ChatInput";
import SiteHeader from "./Components/SiteHeader";
import UserMessage from "./Components/UserMessage";
import BotMessage from "./Components/BotMessage";
import axios from 'axios';
import anime from 'animejs';
import PlaceholdeMessage from "./Components/PlaceholdeMessage";

function Chat() {
  const [isLoading, setIsLoading] = useState(true);

  const [userMessages, setUserMessages] = useState([]); //consider this 'questions'
  const [botMessages, setBotMessages] = useState([]); //consider this 'answers'

  //used to reference the current element to animate
  const userMessageRef = useRef(null);
  const botMessageRef = useRef(null);
  const placeholderRef = useRef(null);

  const chatContainerRef = useRef(null);

  // Automatically animates new messages when userMessages is updated with a new value
  useEffect(() => {
    if (userMessages.length > 0) {
      anime({
        targets: userMessageRef.current,
        opacity: [0, 1],
        translateY: [100, 0],
        scale: [0, 1],
        duration: 300,
        easing: "easeOutQuad",
      });
      const chatContainer = chatContainerRef.current;
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [userMessages]);

  // Used to animate botMessages
  useEffect(() => {
    if (!isLoading && botMessages.length > 0) {
      anime({
        targets: botMessageRef.current,
        opacity: [0, 1],
        translateY: [30, 0],
        scale: [0, 1],
        duration: 300,
        easing: "easeOutQuad",
      });
    }
    /* 
    To make sure the animation triggers when the artifical loading component is removed,
    isLoading is passed as a dependency    
    */
  }, [isLoading, botMessages]);

  // Generates a random delay to simulate the UselessGPT thinking (which it really really really isn't)
  useEffect(() => {
    setIsLoading(true); // Resets loading state when a new bot message is added
    const delay = Math.floor(Math.random() * 2500) + 2000;
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, delay);
    return () => clearTimeout(timer);
  }, [botMessages]);

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

        setBotMessages((prevMess) => [...prevMess, newBotMessage]);
        setUserMessages((prevMess) => [...prevMess, message]);
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
              <UserMessage key={index + message.text} message={message} ref={userMessageRef} />
              {isLoading && index === userMessages.length - 1 ? (
                // Checking index to only render placeholder for latest message
                <PlaceholdeMessage key={`placeholder-${index}`} ref={placeholderRef} />
              ) : (
                <BotMessage key={index + botMessages[index].text} message={botMessages[index]} ref={botMessageRef} />
              )}
            </Fragment>
          ))}
        </div>

        <ChatInput onSend={addMessage}></ChatInput>
      </div>
    </>
  );
}

export default Chat;
