import { Fragment, useRef, useState, useEffect } from "react";
import ChatInput from "./Components/ChatInput";
import SiteHeader from "./Components/SiteHeader";
import UserMessage from "./Components/UserMessage";
import BotMessage from "./Components/BotMessage";
import axios from 'axios';
import Container from 'react-bootstrap/Container';


function Chat() {

  const [userMessages, setUserMessages] = useState([]); //consider this 'questions'
  const [botMessages, setBotMessages] = useState([]); //consider this 'answers'

  const chatContainerRef = useRef(null);

  // Automatically scrolls to bottom when a new message is added
  useEffect(() => {
    if (botMessages.length > 0) {
      const chatContainer = chatContainerRef.current;
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [botMessages]);

  // Called from ChatInput component when user sends a new message
  // TODO: Update with logic to randomize which API that should be called to GET an answer
  function addMessage(message) {

    getNumberFact()
      .then((resp) => {

        const newBotMessage = {
          text: resp.text,
          author: 'Numbers-API',
          url: `http://numbersapi.com/${resp.number}`,
          source: `${resp.number}`
        }

        setBotMessages((prevMess) => [...prevMess, newBotMessage]);
        setUserMessages((prevMess) => [...prevMess, message]);

      })

    // getTrumpQuote()
    //   .then((resp) => { //TODO: Error handling

    //     const date = resp['appeared_at'].substring(0, 10);

    //     const newBotMessage = {
    //       text: resp.value,
    //       author: 'Donald Trump',
    //       url: resp['_links'].self.href,
    //       source: date
    //     }

    //     setBotMessages((prevMess) => [...prevMess, newBotMessage]);
    //     setUserMessages((prevMess) => [...prevMess, message]);

    //   })

    // getKanyeQuote()
    //   .then((resp) => { //TODO: Error handling

    //     const newBotMessage = {
    //       text: resp,
    //       author: 'Kanye West',
    //       url: 'https://github.com/ajzbc/kanye.rest/blob/master/quotes.json',
    //       source: 'source'
    //     }

    //     setBotMessages((prevMess) => [...prevMess, newBotMessage]);
    //     setUserMessages((prevMess) => [...prevMess, message]);

    //   });

  };

  // Called to retrieve a random Kanye West quote 
  function getKanyeQuote() {

    return axios.get('https://api.kanye.rest') //TODO: Error handling
      .then((response) => {
        const quote = response.data.quote;
        return quote;
      });
  }

  // Called to retrieve a random Donald Trump quote 
  function getTrumpQuote() {

    return axios.get('https://tronalddump.io/random/quote') //TODO: Error handling
      .then((response) => {
        const data = response.data;
        return data;
      });
  }

  // Called to retrieve a random fact about math / years / date.  
  function getNumberFact() {

    // We randomly pick a type of fact to fetch from API
    const type = ['math', 'date', 'year', 'trivia'];
    const idx = Math.floor(Math.random() * type.length);

    const URL = `http://numbersapi.com/random/${type[idx]}?json`;

    return axios.get(URL) //TODO: Error handling
      .then((response) => {
        const data = response.data;
        return data;
      });
  }

  return (
    <Container className="bg-dark-subtle mt-4 pt-5 rounded" style={{ minHeight: "95vh", display: "flex", flexDirection: "column" }}>
      <SiteHeader />

      <Container id="chat-container" ref={chatContainerRef} className="overflow-x-hidden p-3" style={{ maxHeight: "calc(95vh - 150px)", width: "100%" }}>
        {userMessages.map((message, index) => (
          <Fragment key={message.text + botMessages[index].text}>
            <UserMessage key={index + message.text} message={message} />
            <BotMessage
              key={index + botMessages[index].text}
              message={botMessages[index]}
              last={index === botMessages.length - 1} // If final element, we handle rendering & animations differently
            />
          </Fragment>
        ))}
      </Container>

      <ChatInput onSend={addMessage} />
    </Container>
  );
}

export default Chat;
