function Chat() {
  return (
    <div className="container bg-dark-subtle w-75 mt-3 pt-3 position-relative" style={{ height: "95vh" }}>

      <h1>UselessGPT</h1>

      <div id="chat-container" className="container overflow-auto">
        {/*</div><div id="chat-container" className="container overflow-auto" style={{ height: "85vh" }}>*/}

        {/* TODO: Render chat messages in here 
                  ADD ROW SYSTEM
                  ADD REACT BOOTSTRAP */}

        {/* Example of message-style below */}
        <figure class="text-end">
          <blockquote class="blockquote">
            <p>A well-known quote, contained in a blockquote element.</p>
          </blockquote>
          <figcaption class="blockquote-footer">
            Someone famous in <cite title="Source Title">Source Title</cite>
          </figcaption>
        </figure>

        <hr></hr>

        <figure class="text-start">
          <blockquote class="blockquote">
            <p>A well-known quote, contained in a blockquote element.</p>
          </blockquote>
          <figcaption class="blockquote-footer">
            Someone famous in <cite title="Source Title">Source Title</cite>
          </figcaption>
        </figure>


      </div>



      <div className="input-group position-absolute bottom-0">
        <input type="text" className="form-control form-control-md" placeholder="Send a message..."></input>
        <button class="btn btn-outline-dark btn-lg" type="button" id="button-chat">{`->`}</button>
      </div>
    </div>
  );
}

export default Chat;
