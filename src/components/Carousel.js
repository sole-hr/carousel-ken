import React from 'react';
import Slider from 'react-slick';
import "./main.css";
// import CarouselItem from './CarouselItem';
// import Footer from './Footer';
import Axios from 'axios';

class Carousel extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            shoe: '',
            shoes: []
        }

        // bind functions below
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        Axios.get('http://ec2-3-88-248-205.compute-1.amazonaws.com/shoes')
            .then((response) => {
                this.setState({
                    shoes: response.data
                })
            })
            .catch((err) => {
                console.log('error mounting component', err);
            })
    }


    handleClick(event) {
        let parent = (event.target.parentNode);
        let sku = parent.getAttribute('sku');
        //console.log(sku);

        if (sku !== null) {
            this.setState({
                shoe: sku
            });

            const productClickEvent = new CustomEvent('productClickEvent', { detail: { sku: sku } })
            window.dispatchEvent(productClickEvent);


            Axios.get('http://ec2-3-88-248-205.compute-1.amazonaws.com/shoes')
                .then((response) => {
                    this.setState({
                        shoes: response.data
                    })
                })
                .catch((err) => {
                    console.log('error mounting component', err);
                })

            window.scrollTo(0, 0);
        }
    }

    render() {
        const settings = {
            accessibility: true,
            adaptiveHeight: true,
            arrows: true,
            className: "center",
            centerMode: true,
            initialSlide: 0,
            centerPadding: "60px",
            slidesToShow: 3,
            speed: 500,
            nextArrow: <NextArrow />,
            prevArrow: <PrevArrow />,
        };
        return (
            <div>
                <h2>YOU MAY ALSO LIKE</h2>
                <div onClick={this.handleClick}>
                    <Slider {...settings}>
                        {this.state.shoes.map((shoe, i) => <CarouselItem key={i} shoe={shoe} />)}
                    </Slider>
                </div>
                <div className="padding"></div>
                <div className="nav-footer"><Footer /></div>
            </div>
        );
    }
}

export default Carousel;
window.Carousel = Carousel;