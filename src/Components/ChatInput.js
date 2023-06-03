import React, { useState } from 'react';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';


export default function ChatInput({ onSend }) {

    const [message, setMessage] = useState('');

    const handleInputChange = (event) => {
        setMessage(event.target.value);
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    }

    const handleSendClick = () => {
        sendMessage();
    }

    const sendMessage = () => {
        if (message.trim() !== '') {
            onSend(message);
            setMessage('');
        } else {
            //TODO: Create alert with empty-message warning
        }
    }

    // Bootstrap Icon --> https://icons.getbootstrap.com/icons/send/
    function sendButtonIcon() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="1.5em" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
                <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
            </svg>)
    }

    return (
        <div className="mt-auto">
            <InputGroup className='mb-3'>
                <FormControl
                    size='lg'
                    type="text"
                    placeholder="Send a message..."
                    aria-describedby="button-chat"
                    value={message}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress}
                    style={{ border: '1px solid grey' }}

                />
                <Button
                    onClick={handleSendClick}
                    variant="dark"
                    id="button-chat"
                    style={{ border: '1px solid grey' }}

                >
                    {sendButtonIcon()}
                </Button>
            </InputGroup>
        </div>)
}
