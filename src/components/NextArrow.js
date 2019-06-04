import React from 'react';
const nextArrow = require('../../assets/images/arrow-right-01-512.png')

const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{
                ...style,
                display: "flex",
                height: "40px",
                width: "40px",
                backgroundColor: "white",
                borderRadius: "50%",
                justifyContent: "center",
                alignItems: "center",
                opacity: ".50"
            }}
            onClick={onClick}>
            <img className="nextArrow" src={nextArrow} />
        </div>
    )
}

export default NextArrow;
window.NextArrow = NextArrow;