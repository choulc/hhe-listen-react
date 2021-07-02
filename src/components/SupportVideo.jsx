import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

const SupportVideo = () => {

    const location = useLocation()
    const lessons = useSelector(state => state.listen.lessons)
    const [supportVideoList, setSupportVideoList] = useState([])
    const [showReadyToGo, setShowReadyToGo] = useState(false)
    const [showSupportVideo, setShowSupportVideo] = useState(false)

    useEffect(() => {
        if (location.search.match(/units=([^&]*)/)) {
            setShowReadyToGo(location.search.match(/units=([^&]*)/)[1].includes("ready-to-go"))
            setShowSupportVideo(location.search.match(/units=([^&]*)/)[1].includes("reading"))
        }
    }, [location.search])


    useEffect(() => {
        let tempSupportVideoList = lessons.filter(lesson => lesson.lesson.makeUpAnimationUrl !== null || lesson.lesson.readyToGoUrl !== null).map(lesson => ({
            'number': lesson.lesson.number,
            'makeUpAnimationUrl': lesson.lesson.makeUpAnimationUrl,
            'makeUpAnimationName': lesson.lesson.makeUpAnimationName,
            'readyToGoUrl': lesson.lesson.readyToGoUrl,
            'readyToGoName': lesson.lesson.readyToGoName,
        }))
        setSupportVideoList(tempSupportVideoList)
    }, [lessons])

    return (
        <React.Fragment>
            <div className={`ani-menu ${!(showReadyToGo || showSupportVideo) && 'hide'}`} id="ani-makeup">
                <div className="title">補充影片</div>
                <ul className="content">
                    {showReadyToGo && supportVideoList.filter(video => video.readyToGoUrl !== null).map((surrportVideo, index) => (
                        <li key={index}>
                            <Link to={{ pathname: surrportVideo.readyToGoUrl }} target="_blank">{`${surrportVideo.readyToGoName} ${surrportVideo.number}`}</Link>
                        </li>
                    ))}
                    {showSupportVideo && supportVideoList.filter(video => video.makeUpAnimationUrl !== null).map((surrportVideo, index) => (
                        <li key={index}>
                            <Link to={{ pathname: surrportVideo.makeUpAnimationUrl }} target="_blank">{`${surrportVideo.makeUpAnimationName} ${surrportVideo.number}`}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </React.Fragment>
    );
}

export default SupportVideo;