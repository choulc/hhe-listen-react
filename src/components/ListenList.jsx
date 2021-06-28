import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudDownloadAlt } from '@fortawesome/free-solid-svg-icons'
import { useAudioPlayer } from 'react-use-audio-player';

const ListenList = (props) => {

    const { lessonList, playIndex, setPlayIndex, playList, setStartPlaying } = props

    const { play } = useAudioPlayer()

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
                                                <Link className="download" download="" to={{ pathname: `https://listenapi.hle.com.tw/download/mp3?d=hhe&t=${unit.audioFolder}&n=${lesson.name}_I${unit.audioFolder}_${unit.typeName}&dn=${lesson.name}_${unit.audioFolder}_${unit.typeName}` }} onClick={(e) => { e.stopPropagation() }} target="_blank">
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