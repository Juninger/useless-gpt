import { useRef, useState } from "react";

function Chat() {

  const inputRef = useRef();
  const [messages, setMessages] = useState([]);

  function addMessage() {
    console.log(inputRef.current.value);
    setMessages([...messages, inputRef.current.value])
  };

  

  return (
    <div className="container bg-dark-subtle w-85 mt-3 pt-3" style={{ minHeight: "95vh", display: "flex", flexDirection: "column" }}>

      {/* TODO: Add header maybe? */}
      <h1>UselessGPT</h1>

      <div id="chat-container" className="container overflow-auto" style={{ maxHeight: "calc(95vh - 150px)" }}>
        {/* Example of message-style below */}
        <figure className="text-end">
          <blockquote className="blockquote">
            <p>A well-known quote, contained in a blockquote element.</p>
          </blockquote>
          <figcaption className="blockquote-footer">
            Someone famous in <cite title="Source Title">Source Title</cite>
          </figcaption>
        </figure>
        <hr />
        <figure className="text-start">
          <blockquote className="blockquote">
            <p>A well-known quote, contained in a blockquote element.</p>
          </blockquote>
          <figcaption className="blockquote-footer">
            Someone famous in <cite title="Source Title">Source Title</cite>
          </figcaption>
        </figure>

        {/* Example of how to render messages below */}
        {messages.map((message) => (
        <figure className="text-start">
          <blockquote className="blockquote">
            <p>{message}</p>
          </blockquote>
          <figcaption className="blockquote-footer">
            Kanye West <cite title="Source Title">(Twitter, 2023)</cite>
          </figcaption>
        </figure>
      ))}
      </div>



      <div className="mt-auto">
        <div className="input-group mb-3">
          <input ref={inputRef} type="text" className="form-control form-control-md" placeholder="Send a message..." aria-describedby="button-chat"></input>
          <button onClick={addMessage} className="btn btn-outline-dark btn-lg" type="button" id="button-chat">{`->`}</button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
