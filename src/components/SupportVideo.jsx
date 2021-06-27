import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const SupportVideo = () => {

    const lessons = useSelector(state => state.listen.lessons)
    const [supportVideoList, setSupportVideoList] = useState([])

    useEffect(() => {
        let tempSupportVideoList = lessons.filter(lesson => lesson.lesson.makeUpAnimationUrl !== null).map(lesson => ({ 'number': lesson.lesson.number, 'makeUpAnimationUrl': lesson.lesson.makeUpAnimationUrl, 'makeUpAnimationName': lesson.lesson.makeUpAnimationName }))
        setSupportVideoList(tempSupportVideoList)
    }, [lessons])

    return (
        <React.Fragment>
            <div className={`ani-menu ${supportVideoList.length === 0 && 'hide'}`} id="ani-makeup">
                <div className="title">補充影片</div>
                <ul className="content">
                    {supportVideoList.map((surrportVideo, index) => (
                        <li key={index}>
                            <Link to={surrportVideo.makeUpAnimationUrl} target="_blank">{`${surrportVideo.makeUpAnimationName} ${surrportVideo.number}`}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </React.Fragment>
    );
}

export default SupportVideo;