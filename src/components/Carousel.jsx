import React, { useEffect, useState } from 'react';
import CarouselImages from './CarouselImages';
import eng1 from '../assets/images/eng1.png';
import eng2 from '../assets/images/eng2.png';
import eng3 from '../assets/images/eng3.png';
import eng4 from '../assets/images/eng4.jpg';
import eng5 from '../assets/images/eng5.jpg';
import '../assets/css/carousel.css'

const Carousel = () => {

    const [book, setBook] = useState('')
    const [radius] = useState(120);
    const [autoRotate] = useState(true);
    const [rotateSpeed] = useState(-30);
    const [animationName, setAnimationName] = useState('spin')
    const [imgWidth] = useState(120);
    const [imgHeight] = useState(170);
    const [imgSet] = useState([
        {
            "name": '1年級/上學期',
            "image": eng1,
            "url": "/listen/1",
        },
        {
            "name": '1年級/下學期',
            "image": eng2,
            "url": "/listen/2",
        },
        {
            "name": '2年級/上學期',
            "image": eng3,
            "url": "/listen/3",
        },
        {
            "name": '2年級/下學期',
            "image": eng4,
            "url": "/listen/4",
        },
        {
            "name": '3年級/上學期',
            "image": eng5,
            "url": "/listen/5",
        },
    ])

    //for init rotate
    useEffect(() => {
        let odrag = document.getElementById('drag-container');
        let ospin = document.getElementById('spin-container')
        let aImg = ospin.getElementsByTagName('img')
        let aEle = [...aImg]

        const init = (delayTime) => {
            for (var i = 0; i < aEle.length; i++) {
                aEle[i].style.transform = "rotateY(" + (i * (360 / aEle.length)) + "deg) translateZ(" + radius + "px)"; //書本間距
                aEle[i].style.transition = "transform 1s";
                aEle[i].style.transitionDelay = delayTime || (aEle.length - i) / 2 + "s";
            }
        }
        setTimeout(init, 1000);

        function applyTranform(obj) {
            // Constrain the angle of camera (between 0 and 180)
            if (tY > 180) tY = 180;
            if (tY < 0) tY = 0;

            // Apply the angle
            obj.style.transform = "rotateX(" + (-tY) + "deg) rotateY(" + (tX) + "deg)";
        }

        function playSpin(yes) {
            ospin.style.animationPlayState = (yes ? 'running' : 'paused');
        }

        let desX = 0
        let desY = 0
        let tX = 0
        let tY = 10;

        // setup events
        document.onpointerdown = function (e) {
            clearInterval(odrag.timer);
            e = e || window.event;
            var sX = e.clientX,
                sY = e.clientY;

            this.onpointermove = function (e) {
                e = e || window.event;
                var nX = e.clientX,
                    nY = e.clientY;
                desX = nX - sX;
                desY = nY - sY;
                tX += desX * 0.1;
                tY += desY * 0.1;
                applyTranform(odrag);
                sX = nX;
                sY = nY;
            };

            this.onpointerup = function (e) {
                odrag.timer = setInterval(function () {
                    desX *= 0.95;
                    desY *= 0.95;
                    tX += desX * 0.1;
                    tY += desY * 0.1;
                    applyTranform(odrag);
                    playSpin(false);
                    if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
                        clearInterval(odrag.timer);
                        playSpin(true);
                    }
                }, 17);
                this.onpointermove = this.onpointerup = null;
            };

            return false;
        };
    }, [radius])

    useEffect(() => {
        setAnimationName(rotateSpeed > 0 ? 'spin' : 'spinRevert')
        // auto spin
        autoRotate && (document.getElementById('spin-container').style.animation = `${animationName} ${Math.abs(rotateSpeed)}s infinite linear`)
    }, [autoRotate, rotateSpeed, animationName])


    const handleMouseOverImg = (e) => {
        setBook(e.target.alt)
    }

    const handleMouseOutImg = () => {
        setBook('')
    }


    return (
        <React.Fragment>
            <div>
                <div id="drag-container">
                    <div id="spin-container" style={{
                        width: imgWidth,
                        height: imgHeight
                    }}>
                        <CarouselImages
                            imgWidth={imgWidth}
                            imgHeight={imgHeight}
                            imgSet={imgSet}
                            handleMouseOverImg={handleMouseOverImg}
                            handleMouseOutImg={handleMouseOutImg}
                        />
                    </div>
                    <div id="ground" style={{
                        width: radius * 2,
                        height: radius * 2,
                    }}></div>
                </div>
                <div id="book">
                    <p>&nbsp;<span>{book}</span>&nbsp;</p>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Carousel;