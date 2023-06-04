import React, { useRef, useEffect } from 'react'
import anime from 'animejs';

function UserMessage(props) {

    const figureRef = useRef(null); // Reference to element that should be animated

    const { message } = props;

    // Triggers animation of figure-element when the component renders
    useEffect(() => {
        const figElement = figureRef.current;
        anime({
            targets: figElement,
            opacity: [0, 1],
            translateY: [30, 0],
            scale: [0, 1],
            duration: 300,
            easing: "easeOutQuad",
        });
    }, []);

    // Bootstrap Icon --> https://icons.getbootstrap.com/icons/person-workspace/
    function userPicture() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" fill="currentColor" className="bi bi-person-workspace" viewBox="0 0 16 16">
                <path d="M4 16s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H4Zm4-5.95a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                <path d="M2 1a2 2 0 0 0-2 2v9.5A1.5 1.5 0 0 0 1.5 14h.653a5.373 5.373 0 0 1 1.066-2H1V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v9h-2.219c.554.654.89 1.373 1.066 2h.653a1.5 1.5 0 0 0 1.5-1.5V3a2 2 0 0 0-2-2H2Z" />
            </svg>
        )
    }

    return (
        <figure ref={figureRef} className="text-end overflow-hidden">
            <blockquote className="blockquote">
                <p>{message.text} {userPicture()}</p>
            </blockquote>
            <figcaption
                className="blockquote-footer">
                You,
                <cite title="Source Title">
                    {message.timestamp}</cite>
            </figcaption>
        </figure>
    )
};

export default UserMessage;
