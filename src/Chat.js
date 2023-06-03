import { Fragment, useRef, useState, useEffect } from "react";
import ChatInput from "./Components/ChatInput";
import SiteHeader from "./Components/SiteHeader";
import UserMessage from "./Components/UserMessage";
import BotMessage from "./Components/BotMessage";
import axios from 'axios';
import anime from 'animejs';

function Chat() {

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
        translateX: [-20, 0],
        duration: 500,
        easing: "easeOutQuad",
      });
    }

    if (botMessages.length > 0) {

      // Generates a random animation delay to simulate the UselessGPT thinking (which it really really isn't)
      const delay = Math.floor(Math.random() * 3000) + 2000;
      
      setTimeout(() => {
        anime({ //customize values and props to change animation style
          targets: botMessageRef.current,
          opacity: [0, 1],
          translateX: [-20, 0],
          duration: 500,
          easing: "easeOutQuad",
        });
      }, delay);
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

        setBotMessages([...botMessages, newBotMessage]);
        /*
        make sure to always update userMessage last, as this will trigger 
        a re-render and needs botmessage to be ready
        */
        setUserMessages([...userMessages, message]);
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
            // index can be used on botMessages, as the two collections can be considered as 'questions' and 'answers' to each other
            <Fragment key={message.text + botMessages[index].text}>
              <UserMessage key={index + message.text} message={message} ref={userMessageRef} />
              <BotMessage key={index + botMessages[index].text} message={botMessages[index]} ref={botMessageRef} />
            </Fragment>
          ))}
        </div>

        <ChatInput onSend={addMessage}></ChatInput>

      </div>

    </>
  );
}

export default Chat;
