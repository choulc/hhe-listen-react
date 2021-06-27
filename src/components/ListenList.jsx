import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudDownloadAlt } from '@fortawesome/free-solid-svg-icons'

const ListenList = () => {

    const lessons = useSelector(state => state.listen.lessons)
    const [lessonList, setLessonList] = useState([])

    useEffect(() => {
        let tempLessonList = lessons.map(lesson => ({ 'name': lesson.lesson.name, 'order': lesson.lesson.order, 'listenPacks': lesson.listenPacks }))
        setLessonList(tempLessonList)
    }, [lessons])

    return (
        <React.Fragment>
            <ol id="listen-list">
                {lessonList.map((lesson, index) => (
                    <React.Fragment key={index}>
                        <li className="lesson">{lesson.name}</li>
                        {
                            lesson.listenPacks.map((unit, unitIndex) => (
                                <React.Fragment key={unitIndex}>
                                    <li className="unit">{unit.typeName}</li>
                                    {unit.stages.map((stage, stageIndex) => (
                                        <React.Fragment key={stageIndex}>
                                            <li className="play-unit stage" data-src={`https://cdn-listening.hle.com.tw/hhe/音檔/${lesson.name}_${unit.audioFolder}_${stage.name}.mp3`}>
                                                <span>{stage.name}
                                                    <Link className="download" download="" to={{ pathname: `https://listenapi.hle.com.tw/download/mp3?d=hhe&t=${unit.audioFolder}&n=${lesson.name}_I${unit.audioFolder}_${unit.typeName}&dn=${lesson.name}_${unit.audioFolder}_${unit.typeName}` }} onClick={(e) => { e.stopPropagation() }} target="_blank">
                                                        <FontAwesomeIcon icon={faCloudDownloadAlt} />
                                                    </Link>
                                                </span>
                                            </li>
                                        </React.Fragment>
                                    ))}
                                </React.Fragment>
                            ))
                        }
                    </React.Fragment>
                ))}
            </ol>
        </React.Fragment>
    );
}

export default ListenList;