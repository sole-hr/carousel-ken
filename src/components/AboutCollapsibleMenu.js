import React from 'react';

const AboutCollapsibleMenu = (props) => {
    return (
        <div className="about">
            <ul>
                <li className="main-link">ABOUT FIKE</li>
                <li className="minor-link">News</li>
                <li className="minor-link">Careers</li>
                <li className="minor-link">Investors</li>
                <li className="minor-link">Purpose</li>
                <li className="minor-link">CA Supply Chains Act</li>
            </ul>
        </div >
    )
}

export default AboutCollapsibleMenu;
window.AboutCollapsibleMenu = AboutCollapsibleMenu;