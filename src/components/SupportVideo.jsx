import React from 'react';
import { Link } from 'react-router-dom';

const SupportVideo = () => {
    return (
        <React.Fragment>
            <div className="ani-menu" id="ani-makeup">
                <div className="title">補充影片</div>
                <ul className="content">
                    <li><Link to="https://www.youtube.com/watch?v=j8fHNdrZTSI&amp;feature=emb_logo" target="_blank">Language in Real Life影片 L2</Link></li>
                    <li><Link to="https://www.youtube.com/watch?v=jRq3UjZJhww" target="_blank">課文補充影片 L4</Link></li>
                    <li><Link to="https://www.youtube.com/watch?v=RWMVwza_DJI" target="_blank">Language in Real Life影片 L5</Link></li>
                    <li><Link to="https://www.youtube.com/watch?v=qaSDb361nKs&amp;ab_channel=TomoNewsUS" target="_blank">課文補充影片 L7</Link></li>
                    <li><Link to="https://abc.com/shows/modern-family" target="_blank">Language in Real Life影片 L8</Link></li>
                </ul>
            </div>
        </React.Fragment>
    );
}

export default SupportVideo;