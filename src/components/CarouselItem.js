import React from 'react';

const CarouselItem = (props) => {
    const getShoeColors = (array) => {
        randomIndex = Math.floor(Math.random() * array.length + 1);
        return randomIndex;
    }
    let randomIndex = getShoeColors(props.shoe.colors);
    //console.log('props', props)
    return (
        <div className="shoe" sku={props.shoe.sku}>
            <img src={props.shoe.images[0]} alt={props.shoe.productName}></img>
            <p className="colors">{randomIndex} Colors</p>
            <p className="shoe-name">{props.shoe.productName}</p>
            <p className="category">Men's Shoe</p>
            <p className="price">${props.shoe.price}</p>
        </div>
    )
}

export default CarouselItem;
window.CarouselItem = CarouselItem;