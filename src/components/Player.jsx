import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { useAudioPlayer, useAudioPosition } from "react-use-audio-player"
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';

const formatTime = (seconds) => {
    const floored = Math.floor(seconds)
    let from = 14
    let length = 5
    // Display hours only if necessary.
    if (floored >= 3600) {
        from = 11
        length = 8
    }

    return new Date(floored * 1000).toISOString().substr(from, length)
}

const Player = (props) => {

    const { playIndex, setPlayIndex, playList, startPlaying, setStartPlaying, playMode, setPlayMode } = props
    const isNullListenPacks = useSelector(state => state.listen.isNullListenPacks)
    const [barWidth, setBarWidth] = useState("0%")
    const seekBarElem = useRef(null)

    const { togglePlayPause, play, ready, loading, playing, player } = useAudioPlayer({
        src: `${playList.length > 0 ? playList[playIndex] : ''}`,
        format: "mp3",
        autoplay: startPlaying,
        loop: true,
        onend: () => {
            handleOnEnd()
        },
    })



    const { duration, position, seek, percentComplete } = useAudioPosition({
        highRefreshRate: true
    })

    useEffect(() => {
        setBarWidth(`${percentComplete}%`)
    }, [percentComplete])

    const goTo = useCallback(
        (event) => {
            const { pageX: eventOffsetX } = event

            if (seekBarElem.current) {
                const elementOffsetX = seekBarElem.current.offsetLeft
                const elementWidth = seekBarElem.current.clientWidth
                const percent = (eventOffsetX - elementOffsetX) / elementWidth
                seek(percent * duration)
            }
        },
        [duration, playing, seek]
    )

    const handleOnEnd = () => {
        playMode === "loopAll" ? (playIndex < playList.length - 1 ? setPlayIndex(playIndex + 1) : setPlayIndex(0)) : setPlayIndex(playIndex)
    }

    const handlePlayButtonClicked = () => {
        togglePlayPause()
        !startPlaying && setStartPlaying(true)
    }

    const handleChangModeRadioOnChaged = e => {
        console.log(e.target.value)
        setPlayMode(e.target.value)
    }

    if (duration === Infinity) return null
    const elapsed = typeof position === "number" ? position : 0


    return (
        <React.Fragment>
            <section id="player-section" className="section-content">
                <div className="container">
                    <div className="row">
                        <div id="play_page">
                            <div className="row player">
                                <div className="col-11 col-xl-8 col-lg-8 col-md-10 col-sm-11 mx-auto">
                                    <div id="play-block" className={isNullListenPacks ? 'hide' : ''}>
                                        <div id="audio-block" className="">
                                            <div className="audiojs" id="audiojs_wrapper0">
                                                <audio id="player" preload="" src="https://cdn-listening.hle.com.tw/hhe/音檔/L01 Building a Better Relationship_IdiomsAndPhrases_Idioms And Phrases.mp3"></audio>
                                                <div className="play-pause d-flex justify-content-center align-items-center" onClick={() => { handlePlayButtonClicked() }}>
                                                    <FontAwesomeIcon icon={playing ? faPause : faPlay} />
                                                </div>
                                                <div className="scrubber" ref={seekBarElem} onClick={goTo}>
                                                    {/* <div className="progress" style={{ width: 0 }}></div>
                                                    <div className="loaded" style={{ width: 425 }}></div> */}
                                                    <div style={{ width: barWidth }} className="progress" />
                                                </div>
                                                <div className="time">
                                                    <em className="played">{formatTime(elapsed)}</em>/<strong className="duration">{formatTime(duration)}</strong>
                                                </div>
                                                <div className="error-message">
                                                </div>
                                            </div>
                                        </div>
                                        <div id="play-mode-block">
                                            <label className="radio-container">單曲循環<input type="radio" name="play-mode" value="loopSingle" onChange={(e) => { handleChangModeRadioOnChaged(e) }} />
                                                <span className="checkmark"></span>
                                            </label>
                                            <label className="radio-container">全部循環<input type="radio" defaultChecked="checked" name="play-mode" value="loopAll" onChange={(e) => { handleChangModeRadioOnChaged(e) }} />
                                                <span className="checkmark"></span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </React.Fragment >
    );
}

export default Player;