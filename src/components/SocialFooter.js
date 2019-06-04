import React from 'react';
const facebook = require('../../assets/images/Social-Facebook-Black.png');
const twitter = require('../../assets/images/logo-twitter-png-47471.png');
const youtube = require('../../assets/images/kisspng-youtube-computer-icons-logo-youtube-music-5b4ad100c4a514.3197520815316298248055.png');
const instagram = require('../../assets/images/logo-instagram-png-13574.png');


const SocialFooter = (props) => {
    return (
        <div className="social-menu">
            <ul className="social-links">
                <li className="social-link"><a href="https://twitter.com/nike?lang=en" ><img className="twitter" src={twitter} /></a></li>
                <li className="social-link"><a href="https://www.facebook.com/nike/"><img className="facebook" src={facebook} /></a></li>
                <li className="social-link"><a href="https://www.youtube.com/user/nike"><img className="youtube" src={youtube} /></a></li>
                <li className="social-link"><a href="https://www.instagram.com/nike/?hl=en"><img className="instagram" src={instagram} /></a></li>
            </ul>
        </div>
    )
}

export default SocialFooter;
window.SocialFooter = SocialFooter;