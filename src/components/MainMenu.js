import React from 'react';

const MainMenu = (props) => {
    return (
        <div className="accordion-body">
            <ul>
                <li className="main-link">GIFT CARDS</li>
                <li className="main-link">STUDENT DISCOUNT</li>
                <li className="main-link">MILITARY DISCOUNT</li>
                <li className="main-link">FIND A STORE</li>
                <li className="main-link">SIGN UP FOR EMAIL</li>
                <li className="main-link">BECOME A MEMBER</li>
                <li className="main-link">SITE FEEDBACK</li>
            </ul>
        </div>
    )
}

export default MainMenu;
window.MainMenu = MainMenu;