import React from 'react';

const Guides = (props) => {
    return (
        <div className="guides">
            <ul>
                <li className="guides-link">Guides</li>
                <li className="guides-link">Terms of Use</li>
                <li className="guides-link">Nike Privacy Policy</li>
            </ul>
        </div>
    )
}

export default Guides;
window.Guides = Guides;