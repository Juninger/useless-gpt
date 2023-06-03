import React, { useState } from 'react';


export default function ChatInput({ onSend }) {

    const [message, setMessage] = useState('');

    const handleInputChange = (event) => {
        setMessage(event.target.value);
    }

    const handleSendClick = () => {
        onSend(message);
        setMessage('');
    }

    // Bootstrap Icon --> https://icons.getbootstrap.com/icons/send/
    function sendButtonIcon() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
                <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
            </svg>)
    }

    return (
        <div className="mt-auto">
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control form-control-md"
                    placeholder="Send a message..."
                    aria-describedby="button-chat"
                    value={message}
                    onChange={handleInputChange}
                />
                <button onClick={handleSendClick} className="btn btn-outline-dark btn-lg" type="button" id="button-chat">
                    {sendButtonIcon()}
                </button>
            </div>
        </div>)
}
