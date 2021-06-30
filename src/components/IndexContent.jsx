import React from 'react';
import 'animate.css'
import Carousel from './Carousel';

const IndexContent = () => {

    return (
        <React.Fragment>
            <div className="intro-body">
                <h1 className="brand-heading">朗讀音檔</h1>
                <p className="intro-text">暢聽無阻 教學不間斷 ・ 精聽訓練 學習不受限</p>
                <p className="notice animate__animated animate__pulse animate__infinite">點選課本進入</p>
                <Carousel />
            </div>
        </React.Fragment>
    );
}

export default IndexContent;