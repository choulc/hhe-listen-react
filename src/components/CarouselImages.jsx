import React from 'react';
import { Link } from 'react-router-dom'

const CarouselImages = (props) => {

    const { imgWidth, imgHeight, imgSet, handleMouseOverImg, handleMouseOutImg } = props

    return (
        <React.Fragment>
            {!!imgSet && imgSet.map((ele, index) => (
                <Link to={ele.url} key={index} onMouseOver={(e) => { handleMouseOverImg(e) }} onMouseOut={(e) => { handleMouseOutImg(e) }}>
                    <img src={ele.image} height={imgHeight} width={imgWidth} alt={ele.name} />
                    <p className="book">{ele.name}</p>
                </Link>
            ))}
        </React.Fragment>
    );
}

export default CarouselImages;