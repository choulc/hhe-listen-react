import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudDownloadAlt } from '@fortawesome/free-solid-svg-icons'

const ListenList = (props) => {

    const { lessonList, playIndex, setPlayIndex, playList, setStartPlaying } = props

    // adding "playing" class for current play item
    useEffect(() => {
        let playListLi = document.querySelectorAll(".play-unit.stage")
        playListLi.forEach(playLi => {
            playLi.dataset.src === playList[playIndex] ? playLi.classList.add("playing") : playLi.classList.remove("playing")

        });
    }, [lessonList, playIndex, playList])

    const handlePlayLiClicked = (e) => {
        setPlayIndex(playList.indexOf(e.target.dataset.src))
        setStartPlaying(true)
    }


    return (
        <React.Fragment>
            <ol id="listen-list">
                {lessonList.map((lesson, index) => (
                    <React.Fragment key={index}>
                        <li className={`lesson ${lesson.listenPacks === null && 'hide'}`}>{lesson.name}</li>
                        {
                            lesson.listenPacks !== null && lesson.listenPacks.map((unit, unitIndex) => (
                                <React.Fragment key={unitIndex}>
                                    <li className="unit">{unit.typeName}</li>
                                    {unit.stages.map((stage, stageIndex) => (
                                        <React.Fragment key={stageIndex}>
                                            <li className="play-unit stage" data-src={`https://cdn-listening.hle.com.tw/hhe/音檔/${lesson.name}_${unit.audioFolder}_${stage.name}.mp3`} onClick={(e) => { handlePlayLiClicked(e) }}>
                                                {stage.name}
                                                {console.log(`https://listenapi.hle.com.tw/download/mp3?d=hhe&t=${unit.typeName}&n=${encodeURIComponent(lesson.name)}_${unit.typeName}_${encodeURIComponent(stage.name)}&dn=${encodeURIComponent(lesson.name)}_${unit.typeName}_${encodeURIComponent(stage.name)}`)}
                                                <Link className="download" download="" to={{ pathname: `https://listenapi.hle.com.tw/download/mp3?d=hhe&t=${decodeURI(unit.audioFolder)}&n=${lesson.name}_${decodeURI(unit.audioFolder)}_${stage.name}&dn=${lesson.name}_${decodeURI(unit.audioFolder)}_${stage.name}` }} onClick={(e) => { e.stopPropagation() }} target="_blank">
                                                    <FontAwesomeIcon icon={faCloudDownloadAlt} />
                                                </Link>
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