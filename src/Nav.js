import React from 'react';
import {Link} from 'react-router-dom';
import firebase from 'firebase';

class Nav extends React.Component {
    render() {
        return (
            <div>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/journal">Journal</Link></li>
                </ul>
            </div>
        )
    }
}

export default Nav;