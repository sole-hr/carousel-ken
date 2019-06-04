import React from 'react';
const prevArrow = require('../../assets/images/arrow-left-01-512.png');

const PrevArrow = (props) => {
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
            <img className="prevArrow" src={prevArrow} />
        </div>
    )
}

export default PrevArrow;
window.PrevArrow = PrevArrow;