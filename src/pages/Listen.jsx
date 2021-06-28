import React, { useEffect, useState } from 'react';
import '../assets/css/style.css';
import '../assets/css/player.css';
import '../assets/css/listen.css';
import Menu from '../components/Menu';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'
import { getMenu } from '../store/menuSlice';
import ListenContent from '../components/ListenContent';
import ListenFooter from '../components/ListenFooter';
import Player from '../components/Player';
import { AudioPlayerProvider } from "react-use-audio-player"
import { updateIsNullListenPacks } from '../store/listenSlice';

const Listen = () => {

    const dispatch = useDispatch()
    const lessons = useSelector(state => state.listen.lessons)
    const [playList, setPlayList] = useState([])
    const [playIndex, setPlayIndex] = useState(0)
    const [lessonList, setLessonList] = useState([])
    const [startPlaying, setStartPlaying] = useState(false)
    const [playMode, setPlayMode] = useState('loopAll')

    useEffect(() => {
        const getData = async () => {
            let result = await axios.get('https://listenapi.hle.com.tw/domain/hhe/selectors')
            dispatch(getMenu(result.data))
        }
        getData()
    }, [dispatch])

    useEffect(() => {
        let tempLessonList = lessons.map(lesson => ({ 'name': lesson.lesson.name, 'order': lesson.lesson.order, 'listenPacks': lesson.listenPacks }))
        setLessonList(tempLessonList)
        dispatch(updateIsNullListenPacks(true))
        tempLessonList.forEach(lesson => {
            lesson.listenPacks !== null && dispatch(updateIsNullListenPacks(false))
        });
    }, [lessons, dispatch])

    useEffect(() => {
        let tempPlayList = []
        lessons.forEach(lesson => {
            lesson.listenPacks !== null && lesson.listenPacks.forEach(unit => {
                unit.stages.forEach(stage => {
                    tempPlayList.push(`https://cdn-listening.hle.com.tw/hhe/音檔/${lesson.lesson.name}_${unit.audioFolder}_${stage.name}.mp3`)
                });
            });
        });
        setPlayList(tempPlayList)
        console.log(tempPlayList[0])
    }, [lessons])

    return (
        <React.Fragment>
            <AudioPlayerProvider>
                <Menu
                    setPlayIndex={setPlayIndex}
                    setStartPlaying={setStartPlaying}
                />
                <ListenContent
                    lessonList={lessonList}
                    playIndex={playIndex}
                    setPlayIndex={setPlayIndex}
                    playList={playList}
                    setStartPlaying={setStartPlaying}
                />
                <Player
                    playIndex={playIndex}
                    setPlayIndex={setPlayIndex}
                    playList={playList}
                    startPlaying={startPlaying}
                    setStartPlaying={setStartPlaying}
                    playMode={playMode}
                    setPlayMode={setPlayMode}
                />
                <ListenFooter />
            </AudioPlayerProvider>
        </React.Fragment>
    );
}

export default Listen;