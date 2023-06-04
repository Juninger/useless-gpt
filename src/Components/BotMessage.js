import React, { useRef, useEffect, useState } from 'react'
import anime from 'animejs';
import Spinner from 'react-bootstrap/Spinner'


function BotMessage(props) {

    const botMessageRef = useRef(null); // Reference to element that should be animated
    const placeholderRef = useRef(null); // Reference to element that should be animated

    const [isLoading, setIsLoading] = useState(true); // Tracks artificial loading of answer from bot

    const { message, last } = props;

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
        }, delay);
        return () => clearTimeout(timer);
    }, []);

    // Bootstrap Icon --> https://icons.getbootstrap.com/icons/hourglass-split/
    function hourGlassIcon() {
        return (
            <>
                <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" fill="currentColor" className="bi bi-hourglass-split" viewBox="0 0 16 16">
                    <path d="M2.5 15a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1h-11zm2-13v1c0 .537.12 1.045.337 1.5h6.326c.216-.455.337-.963.337-1.5V2h-7zm3 6.35c0 .701-.478 1.236-1.011 1.492A3.5 3.5 0 0 0 4.5 13s.866-1.299 3-1.48V8.35zm1 0v3.17c2.134.181 3 1.48 3 1.48a3.5 3.5 0 0 0-1.989-3.158C8.978 9.586 8.5 9.052 8.5 8.351z" />
                </svg>
                {' '}
            </>
        )
    }

    // Bootstrap Icon --> https://icons.getbootstrap.com/icons/robot/ 
    function botPicture() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" fill="currentColor" className="bi bi-robot" viewBox="0 0 16 16">
                <path d="M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5ZM3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.58 26.58 0 0 0 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.933.933 0 0 1-.765.935c-.845.147-2.34.346-4.235.346-1.895 0-3.39-.2-4.235-.346A.933.933 0 0 1 3 9.219V8.062Zm4.542-.827a.25.25 0 0 0-.217.068l-.92.9a24.767 24.767 0 0 1-1.871-.183.25.25 0 0 0-.068.495c.55.076 1.232.149 2.02.193a.25.25 0 0 0 .189-.071l.754-.736.847 1.71a.25.25 0 0 0 .404.062l.932-.97a25.286 25.286 0 0 0 1.922-.188.25.25 0 0 0-.068-.495c-.538.074-1.207.145-1.98.189a.25.25 0 0 0-.166.076l-.754.785-.842-1.7a.25.25 0 0 0-.182-.135Z" />
                <path d="M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2V1.866ZM14 7.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.5A3.5 3.5 0 0 1 5.5 4h5A3.5 3.5 0 0 1 14 7.5Z" />
            </svg>
        )
    }

    if (isLoading && last) { // Show placeholder figure while "loading" new message
        return (
            <figure ref={placeholderRef} className="text-start overflow-hidden">
                <blockquote className="blockquote">
                    <>
                        {hourGlassIcon()}
                        <Spinner size='sm' animation="grow" variant="primary" />
                        <Spinner size='sm' animation="grow" variant="primary" />
                        <Spinner size='sm' animation="grow" variant="primary" />
                        <Spinner size='sm' animation="grow" variant="primary" />
                        <Spinner size='sm' animation="grow" variant="primary" />
                        <Spinner size='sm' animation="grow" variant="primary" />
                        <Spinner size='sm' animation="grow" variant="primary" />
                    </>
                </blockquote>
                <figcaption className="blockquote-footer">
                    <cite title="Source Title">
                        {'Thinking...'}
                    </cite>
                </figcaption>
            </figure>
        )

    } else { // Show botmessage when "loading" has finished
        return (
            <figure ref={botMessageRef} className="text-start overflow-hidden">
                <blockquote className="blockquote">
                    <p>{botPicture()} {message.text}</p>
                </blockquote>
                <figcaption
                    className="blockquote-footer">
                    {message.author + ', '}
                    <cite title="Source Title">
                        <a href={message.url} target='_blank' rel='noreferrer'>
                            {message.source}
                        </a>
                    </cite>
                </figcaption>
            </figure>
        )
    }
};

export default BotMessage;
