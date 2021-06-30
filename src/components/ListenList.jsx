import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudDownloadAlt } from '@fortawesome/free-solid-svg-icons';
import * as constConfig from '../appConfig';

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
                                            <li
                                                className="play-unit stage"
                                                data-src={`${constConfig.AMAZON_DOMAIN_URL}/${constConfig.EDU_DOMAIN}/音檔/${lesson.name}_${unit.audioFolder}_${stage.name}.mp3`}
                                                onClick={(e) => { handlePlayLiClicked(e) }}
                                            >
                                                {stage.name}
                                                <Link
                                                    className="download"
                                                    download=""
                                                    to={{ pathname: `${constConfig.API_URL}/download/mp3?d=${constConfig.EDU_DOMAIN}&t=${decodeURI(unit.audioFolder)}&n=${lesson.name}_${decodeURI(unit.audioFolder)}_${stage.name}&dn=${lesson.name}_${decodeURI(unit.audioFolder)}_${stage.name}` }}
                                                    onClick={(e) => { e.stopPropagation() }}
                                                    target="_blank"
                                                >
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