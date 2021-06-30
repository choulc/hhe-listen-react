import React from 'react';
import { Link } from 'react-router-dom'
import hanlin_logo from '../assets/images/hanlin_logo.png'
import logo from '../assets/images/logo.png'
import '../assets/css/style.css'


const Navbar = () => {
    return (
        <React.Fragment>
            <nav className="navbar navbar-custom fixed-top" role="navigation">
                <div className="container">
                    <div className="navbar-header">
                        <Link className="navbar-brand page-scroll" to="/">
                            <img src={hanlin_logo} alt="翰林" className="logo" />
                            <img src={logo} alt="logo" className="channel" />
                        </Link>
                    </div>
                </div>
            </nav>
        </React.Fragment>
    );
}

export default Navbar;