import React, { useState, useRef, useEffect } from 'react';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';


export default function ChatInput({ onSend, disabled }) {

    const [messageText, setMessageText] = useState('');
    const inputRef = useRef(null);
    
    // Focuses the input field after re-enabling it
    useEffect(() => { 
        inputRef.current.focus();
    }, [disabled]);

    // Updates state of messageText every time user types something
    const handleInputChange = (event) => {
        setMessageText(event.target.value);
    }

    // Used to check if user pressed enter key to send message
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    }

    // Used when user clicks the send-button
    const handleSendClick = () => {
        sendMessage();
    }

    // Handles all logic for passing the message object to main component for API-calls and rendering
    const sendMessage = () => {
        if (messageText.trim() !== '') {

            const messageObj = {
                text: messageText,
                timestamp: getCurrentTime()
            };

            onSend(messageObj);
            setMessageText('');
        } else {
            alert("Can not send an empty message");
        }
    }
    
    // Creates a timestamp for when the user sends a message
    function getCurrentTime() {
        // Options to remove the milliseconds and seconds from our timestamp
        const timeFormat = { hour: '2-digit', minute: '2-digit'};
        return new Date().toLocaleString(undefined, timeFormat);
    }

    // Bootstrap Icon --> https://icons.getbootstrap.com/icons/send/
    function sendButtonIcon() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="1.5em" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
                <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
            </svg>)
    }

    return (
        <Container className="mt-auto">
            <InputGroup className='mb-3'>
                <FormControl
                    ref={inputRef}
                    size='lg'
                    type="text"
                    placeholder="Send a message..."
                    aria-describedby="button-chat"
                    value={messageText}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress}
                    style={{ border: '1px solid grey' }}
                    disabled={disabled}
                />
                <Button
                    onClick={handleSendClick}
                    variant="dark"
                    id="button-chat"
                    style={{ border: '1px solid grey' }}
                    disabled={disabled}
                >
                    {sendButtonIcon()}
                </Button>
            </InputGroup>
        </Container>)
}
