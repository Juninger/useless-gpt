import React from 'react'

export default function UserMessage({ query }) {

    // Bootstrap Icon --> https://icons.getbootstrap.com/icons/person-workspace/
    function userPicture() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-workspace" viewBox="0 0 16 16">
                <path d="M4 16s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H4Zm4-5.95a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                <path d="M2 1a2 2 0 0 0-2 2v9.5A1.5 1.5 0 0 0 1.5 14h.653a5.373 5.373 0 0 1 1.066-2H1V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v9h-2.219c.554.654.89 1.373 1.066 2h.653a1.5 1.5 0 0 0 1.5-1.5V3a2 2 0 0 0-2-2H2Z" />
            </svg>
        )
    }

    // Creates a timestamp for when the user sends a message
    function getCurrentTime() {
        // Options to remove the milliseconds and seconds from our timestamp
        const timeFormat = { hour: '2-digit', minute: '2-digit'};
        return new Date().toLocaleString(undefined, timeFormat);
    }

    return (
        <figure className="text-end">
            <blockquote className="blockquote">
                <p>{'query: ' + query} {userPicture()}</p>
            </blockquote>
            <figcaption className="blockquote-footer">
                You, <cite title="Source Title">{getCurrentTime()}</cite>
            </figcaption>
        </figure>
    )
}
