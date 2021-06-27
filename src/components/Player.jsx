import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAudioPlayer } from "react-use-audio-player"

const Player = () => {

    const lessons = useSelector(state => state.listen.lessons)
    const [playList, setPlayList] = useState([])
    const [playIndex, setPlayIndex] = useState(0)

    useEffect(() => {
        let tempPlayList = []
        lessons.forEach(lesson => {
            lesson.listenPacks.forEach(unit => {
                unit.stages.forEach(stage => {
                    tempPlayList.push(`https://cdn-listening.hle.com.tw/hhe/音檔/${lesson.lesson.name}_${unit.audioFolder}_${stage.name}.mp3`)
                });
            });
        });
        setPlayList(tempPlayList)
        console.log(tempPlayList[0])
    }, [lessons])

    const { togglePlayPause, ready, loading, playing } = useAudioPlayer({
        src: `${playList.length > 0 ? playList[0] : ''}`,
        format: "mp3",
        autoplay: false,
        onend: () => console.log("sound has ended!")
    })

    return (
        <React.Fragment>
            <section id="player-section" class="section-content">
                <div class="container">
                    <div class="row">
                        <div id="play_page">
                            <div class="row player">
                                <div class="col-11 col-xl-8 col-lg-8 col-md-10 col-sm-11 mx-auto">
                                    <div id="play-block" class="">
                                        <div id="audio-block" class="">
                                            <div class="audiojs" classname="audiojs" id="audiojs_wrapper0">
                                                <audio id="player" preload="" src="https://cdn-listening.hle.com.tw/hhe/音檔/L01 Building a Better Relationship_IdiomsAndPhrases_Idioms And Phrases.mp3"></audio>
                                                <div class="play-pause">
                                                    {/* <p class="play"></p>
                                                    <p class="pause"></p>
                                                    <p class="loading"></p>
                                                    <p class="error"></p> */}
                                                    <button onClick={togglePlayPause}>{playing ? "Pause" : "Play"}</button>
                                                </div>
                                                <div class="scrubber">
                                                    <div class="progress" style={{ width: 0 }}></div>
                                                    <div class="loaded" style={{ width: 425 }}></div>
                                                </div>
                                                <div class="time">
                                                    <em class="played">00:00</em>/<strong class="duration">00:58</strong>
                                                </div>
                                                <div class="error-message">
                                                </div>
                                            </div>
                                        </div>
                                        <div id="play-mode-block">
                                            <label class="radio-container">單曲循環<input type="radio" name="play-mode" value="single" />
                                                <span class="checkmark"></span>
                                            </label>
                                            <label class="radio-container">全部循環<input type="radio" checked="checked" name="play-mode" value="all" />
                                                <span class="checkmark">
                                                </span>
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