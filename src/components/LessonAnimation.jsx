import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const LessonAnimation = () => {

    const lessons = useSelector(state => state.listen.lessons)
    const [animationList, setAnimationList] = useState([])

    useEffect(() => {
        let tempAnimationList = lessons.filter(lesson => lesson.lesson.readingAnimationUrl !== null).map(lesson => ({ 'number': lesson.lesson.number, 'readingAnimationUrl': lesson.lesson.readingAnimationUrl }))
        setAnimationList(tempAnimationList)
    }, [lessons])

    return (
        <React.Fragment>
            <div className={`ani-menu ${animationList.length === 0 && 'hide'}`} id="ani-reading">
                <div className="title">課文動畫</div>
                <ul className="content">
                    {animationList.map((animation, index) => (
                        <li key={index}>
                            <Link to={animation.readingAnimationUrl} target="_blank">{animation.number}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </React.Fragment>
    );
}

export default LessonAnimation;