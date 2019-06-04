import React from 'react';

const HelpCollapsibleMenu = (props) => {
    return (
        <div className="help">
            <ul>
                <li className="main-link">GET HELP</li>
                <li className="minor-link">Order Status</li>
                <li className="minor-link">Shipping and Delivery</li>
                <li className="minor-link">Returns</li>
                <li className="minor-link">Payment Options</li>
                <li className="minor-link">Contact Us</li>
            </ul>
        </div>
    )
}

export default HelpCollapsibleMenu;
window.HelpCollapsibleMenu = HelpCollapsibleMenu;
