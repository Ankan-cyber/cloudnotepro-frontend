import React, { useState } from 'react'

const Footer = () => {

    const [isHover, setIsHover] = useState(false);

    const handleMouseEnter = () => {
        setIsHover(true);
    };

    const handleMouseLeave = () => {
        setIsHover(false);
    };

    const a = {
        color: "#c4c3ca",
        textDecoration: isHover ? 'underline' : 'none'
    }
    return (
        <div style={{ color: '#c4c3ca' }} className="text-center">Made with ❤️ by <a href="https://ankanroy.in" target="_blank" rel="noreferrer" style={a} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Ankan</a></div>
    )
}

export default Footer