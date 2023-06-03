import React from 'react'
import Navbar from 'react-bootstrap/Navbar';

export default function SiteHeader() {
    return (
        <>
            <Navbar fixed='top' bg='dark' variant='dark'>
                <Navbar.Brand>UselessGPT</Navbar.Brand>
            </Navbar>
            <div style={{ paddingTop: '25px' }}></div>
        </>
    )
}
