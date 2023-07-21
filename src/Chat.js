import { Fragment, useRef, useState, useEffect } from "react";
import ChatInput from "./Components/ChatInput";
import SiteHeader from "./Components/SiteHeader";
import UserMessage from "./Components/UserMessage";
import BotMessage from "./Components/BotMessage";
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import WelcomeMessage from "./Components/WelcomeMessage";

function Chat() {

  const [userMessages, setUserMessages] = useState([]); //consider this 'questions'
  const [botMessages, setBotMessages] = useState([]); //consider this 'answers'

  const [inputDisabled, setInputDisabled] = useState(false); //used to temporarily disable input field when waiting for response

  const chatContainerRef = useRef(null);

  // Automatically scrolls to bottom when a new message is added
  useEffect(() => {
    if (botMessages.length > 0) {
      const chatContainer = chatContainerRef.current;
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [botMessages]);

  // Called from ChatInput component when user sends a new message
  function handleNewMessage(message) {

    setInputDisabled(true);

    // List of available APIs to use. Picks one at random.
    const APIs = [getTrumpQuote, getKanyeQuote];
    const idx = Math.floor(Math.random() * APIs.length);
    const randomAPI = APIs[idx];

    randomAPI().then((response) => {
      let newBotMessage;

      if (randomAPI === getTrumpQuote) {

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
      .catch((error) => { // Creates a manual error message if GET fails
        console.error('Error:', error);
        const errorMessage = {
          text: "Error creating response",
          author: 'UselessGPT',
          url: 'https://github.com/Juninger/useless-gpt',
          source: 'GitHub'
        }
        setBotMessages((prevMess) => [...prevMess, errorMessage]);
        setUserMessages((prevMess) => [...prevMess, message]);
      });
  };

  // Called to retrieve a random Donald Trump quote 
  function getTrumpQuote() {

    return axios.get('https://tronalddump.io/random/quote')
      .then((response) => {
        const data = response.data;
        return data;
      })
      .catch((error) => {
        console.error("Could not GET Donald Trump quote:", error);
        throw error;
      });
  }

  // Called to retrieve a random Kanye West quote 
  function getKanyeQuote() {

    return axios.get('https://api.kanye.rest')
      .then((response) => {
        const quote = response.data.quote;
        return quote;
      })
      .catch((error) => {
        console.error("Could not GET Kanye West quote:", error);
        throw error;
      });
  }

  return (
    <Container className="bg-dark-subtle mt-4 pt-5 rounded" style={{ minHeight: "95vh", display: "flex", flexDirection: "column" }}>
      <SiteHeader />

      <Container id="chat-container" ref={chatContainerRef} className="overflow-x-hidden p-3" style={{ maxHeight: "calc(95vh - 150px)", width: "100%" }}>
        <WelcomeMessage />
        {userMessages.map((message, index) => (
          <Fragment key={message.text + botMessages[index].text}>
            <UserMessage key={index + message.text} message={message} />
            <BotMessage
              key={index + botMessages[index].text}
              message={botMessages[index]}
              last={index === botMessages.length - 1} // If final element, we handle rendering & animations differently
              enableInput={() => setInputDisabled(false)}
            />
          </Fragment>
        ))}
      </Container>

      <ChatInput onSend={handleNewMessage} disabled={inputDisabled} />
    </Container>
  );
}

export default Chat;