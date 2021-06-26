import React from 'react';
import IndexContent from '../components/IndexContent';
import IndexFooter from '../components/IndexFooter';
import '../assets/css/style.css';
import '../assets/css/home.css';

const Index = () => {
    return (
        <React.Fragment>
            <header className="intro intro-hhe">
                <IndexContent />
                <IndexFooter />
            </header>
        </React.Fragment>
    );
}

export default Index;