import { Fragment, useRef, useState, useEffect } from "react";
import ChatInput from "./Components/ChatInput";
import SiteHeader from "./Components/SiteHeader";
import UserMessage from "./Components/UserMessage";
import BotMessage from "./Components/BotMessage";
import axios from 'axios';
import anime from 'animejs';
import Spinner from 'react-bootstrap/Spinner';

function Chat() {
  const [isLoading, setIsLoading] = useState(true);

  const [userMessages, setUserMessages] = useState([]); //consider this 'questions'
  const [botMessages, setBotMessages] = useState([]); //consider this 'answers'

  //used to reference the current element to animate
  const userMessageRef = useRef(null); 
  const botMessageRef = useRef(null);

  // Automatically animates new messages when userMessages is updated with a new value
  useEffect(() => {
    if (userMessages.length > 0) { //should be animated as soon as user sends a new message
      anime({ //customize values and props to change animation style
        targets: userMessageRef.current,
        opacity: [0, 1],
        translateX: [-100, 0],
        duration: 500,
        easing: "easeOutQuad",
      });
    }
  }, [userMessages]);

  useEffect(() => {
    if (botMessages.length > 0) {

      // Generates a random animation delay to simulate the UselessGPT thinking (which it really really isn't)
      const delay = Math.floor(Math.random() * 3000) + 2000;

      anime({ //customize values and props to change animation style
        targets: botMessageRef.current,
        opacity: [0, 1],
        translateX: [-200, 0],
        duration: 500,
        easing: "easeOutQuad",
      });
    }
    /* 
    To make sure the animation triggers when the artifical loading component is removed,
    we pass isLoading as a dependency    
    */ 
  }, [botMessages, isLoading]);

  useEffect(() => {
    if (botMessages.length > 0) {
      setIsLoading(true); // Set loading state to true when a new bot message is added
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }
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

        setBotMessages([...botMessages, newBotMessage]);
        setUserMessages([...userMessages, message]);
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
      <div className="container bg-dark-subtle w-85 mt-4 pt-5" style={{ minHeight: "95vh", display: "flex", flexDirection: "column" }}>
        <SiteHeader />

        <div id="chat-container" className="container overflow-auto" style={{ maxHeight: "calc(95vh - 150px)" }}>
          {userMessages.map((message, index) => (
            <Fragment key={message.text + botMessages[index].text}>
              <UserMessage key={index + message.text} message={message} ref={userMessageRef} />
              {isLoading && index === userMessages.length - 1 ? (
                // Checkig index to only render for latest message
                <>
                {/* PLACEHOLDER LOADING COMPONENTS */}
                <Spinner animation="grow" variant="primary" />
                <Spinner animation="grow" variant="secondary" />
                <Spinner animation="grow" variant="success" />
                <Spinner animation="grow" variant="danger" />
                <Spinner animation="grow" variant="warning" />
                <Spinner animation="grow" variant="info" />
                <Spinner animation="grow" variant="light" />
                <Spinner animation="grow" variant="dark" />
                </>
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
