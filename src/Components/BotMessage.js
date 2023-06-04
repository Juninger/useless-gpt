import React, { useRef, useEffect, useState } from 'react'
import anime from 'animejs';
import PlaceholderMessage from './PlaceholderMessage';
import FinishedBotMessage from './FinishedBotMessage';


function BotMessage(props) {

    const botMessageRef = useRef(null); // Reference to element that should be animated
    const placeholderRef = useRef(null); // Reference to element that should be animated

    const [isLoading, setIsLoading] = useState(true); // Tracks artificial loading of answer from bot

    const { message, last, enableInput } = props;

    // Triggers animation of figure-element when the component renders
    useEffect(() => {

        if (isLoading) {

            anime({ // Animation for placeholder
                targets: placeholderRef.current,
                opacity: [0, 1],
                translateX: [-200, 0],
                duration: 500,
                easing: "easeOutQuad",
            });
        } else {

            anime({ // Animation for botmessage
                targets: botMessageRef.current,
                opacity: [0, 1],
                translateY: [30, 0],
                scale: [0, 1],
                duration: 300,
                easing: "easeOutQuad",
            });
        }
    }, [isLoading]);

    // Generates a random delay to simulate the UselessGPT thinking (which it really really really isn't)
    useEffect(() => {
        setIsLoading(true); // Resets loading state when a new bot message is added
        const delay = Math.floor(Math.random() * 2500) + 2000;
        const timer = setTimeout(() => {
            setIsLoading(false);
            enableInput(); //re-enables the input field when bot message is added
        }, delay);
        return () => clearTimeout(timer);
    }, []);

    return (
        isLoading && last ? (
            <PlaceholderMessage ref={placeholderRef}></PlaceholderMessage>
        ) : (
            <FinishedBotMessage ref={botMessageRef} message={message}></FinishedBotMessage>
        )
    );
};

export default BotMessage;
