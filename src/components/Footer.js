import React from 'react';
// import MainFooter from './MainFooter';
// import SubFooter from './Subfooter';

const Footer = (props) => {
    return (
        <div className="footer">
            <div><MainFooter /></div>
            <div><Subfooter /></div>
        </div>
    )
}

export default Footer;
window.Footer = Footer;