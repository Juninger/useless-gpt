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
  function handleNewMessage(message) {

    const APIs = [getNumberFact, getTrumpQuote, getKanyeQuote];
    const idx = Math.floor(Math.random() * APIs.length);
    const randomAPI = APIs[idx];

    randomAPI().then((response) => {
      let newBotMessage;

      if (randomAPI === getNumberFact) {

        newBotMessage = {
          text: response.text,
          author: 'Numbers-API',
          url: `http://numbersapi.com/${response.number}`,
          source: `${response.number}`
        }
         
      } else if (randomAPI === getTrumpQuote) {

        const date = response['appeared_at'].substring(0, 10);

        newBotMessage = {
          text: response.value,
          author: 'Donald Trump',
          url: response['_links'].self.href,
          source: date
        }
        
      } else if (randomAPI === getKanyeQuote) {

        newBotMessage = {
          text: response,
          author: 'Kanye West',
          url: 'https://github.com/ajzbc/kanye.rest/blob/master/quotes.json',
          source: 'source'
        }

      }

      setBotMessages((prevMess) => [...prevMess, newBotMessage]);
      setUserMessages((prevMess) => [...prevMess, message]);

    })

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

      <ChatInput onSend={handleNewMessage} />
    </Container>
  );
}

export default Chat;
