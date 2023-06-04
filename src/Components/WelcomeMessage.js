import React, { useRef, useEffect, useState } from 'react'
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import anime from 'animejs';


export default function WelcomeMessage() {

    const [show, setShow] = useState(true); 
    const alertRef = useRef(null);

    // Triggers animation of alert-element when the component renders
    useEffect(() => {
        const figElement = alertRef.current;
        anime({
            targets: figElement,
            opacity: [0, 1],
            translateY: [50, 0],
            scale: [0, 1],
            duration: 2000,
            easing: "easeOutQuad",
        });
    }, []);

    // Bootstrap Icon --> https://icons.getbootstrap.com/icons/robot/ 
    function botIcon() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" fill="currentColor" className="bi bi-robot" viewBox="0 0 16 16">
                <path d="M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5ZM3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.58 26.58 0 0 0 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.933.933 0 0 1-.765.935c-.845.147-2.34.346-4.235.346-1.895 0-3.39-.2-4.235-.346A.933.933 0 0 1 3 9.219V8.062Zm4.542-.827a.25.25 0 0 0-.217.068l-.92.9a24.767 24.767 0 0 1-1.871-.183.25.25 0 0 0-.068.495c.55.076 1.232.149 2.02.193a.25.25 0 0 0 .189-.071l.754-.736.847 1.71a.25.25 0 0 0 .404.062l.932-.97a25.286 25.286 0 0 0 1.922-.188.25.25 0 0 0-.068-.495c-.538.074-1.207.145-1.98.189a.25.25 0 0 0-.166.076l-.754.785-.842-1.7a.25.25 0 0 0-.182-.135Z" />
                <path d="M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2V1.866ZM14 7.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.5A3.5 3.5 0 0 1 5.5 4h5A3.5 3.5 0 0 1 14 7.5Z" />
            </svg>
        )
    }

    // Bootstrap Icon --> https://icons.getbootstrap.com/icons/chat-left-text/ 
    function chatIcon() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" fill="currentColor" className="bi bi-chat-left-text" viewBox="0 0 16 16">
                <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
            </svg>
        )
    }

    return (
        <Row>
            <Col>
                {show &&
                    <Alert
                        ref={alertRef}
                        onClose={() => setShow(false)}
                        variant="success"
                        className="text-center"
                        dismissible
                    >
                        <Alert.Heading>{botIcon()} - Welcome to UselessGPT! - {chatIcon()}</Alert.Heading>
                        Start by asking a question. Click a message to see more info.
                    </Alert>
                }
            </Col>
        </Row>
    )
}
