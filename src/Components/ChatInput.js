import React from 'react'
import SendButtonIcon from './SendButtonIcon'

export default function ChatInput({ onSend }) {
    return (
        <div className="mt-auto">
            <div className="input-group mb-3">
                <input type="text" className="form-control form-control-md" placeholder="Send a message..." aria-describedby="button-chat"></input>
                <button onClick={onSend} className="btn btn-outline-dark btn-lg" type="button" id="button-chat">
                    <SendButtonIcon/>
                </button>
            </div>
        </div>)
}
