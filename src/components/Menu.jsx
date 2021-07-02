import * as _ from 'lodash';
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faBookmark, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { getLessons } from '../store/listenSlice';
import { useAudioPlayer } from 'react-use-audio-player';
import * as constConfig from '../appConfig';

const Menu = (props) => {

    const { setPlayIndex, setStartPlaying } = props
    const { volumeNum } = useParams()
    const dispatch = useDispatch()
    const location = useLocation()
    const history = useHistory()
    const volumeSelectors = useSelector(state => state.menu.volumeSelectors)
    const listenTypeSelectors = useSelector(state => state.menu.listenTypeSelectors)
    const [activeVolume, setActiveVolume] = useState(0)
    const [volumeLessonList, setVolumeLessonList] = useState([[], [], [], [], []])
    const [volumeLessonCheckedState, setVolumeLessonCheckedState] = useState([[], [], [], [], []])
    const [volumeUnitCheckedState, setVolumeUnitCheckedState] = useState([[], [], [], [], []])
    const { stop } = useAudioPlayer()

    //init
    useEffect(() => {
        let tempVolumeLessonList = [...volumeLessonList]
        let tempLessonCheckedState = [...volumeLessonCheckedState]
        let tempUnitCheckedState = [...volumeUnitCheckedState]

        volumeSelectors.forEach((volume, volumeIndex) => {
            volume.lessonSelectors.forEach(lesson => {
                tempVolumeLessonList[volumeIndex].push(lesson.number)
                tempLessonCheckedState[volumeIndex].push(false)
            });
        });
        volumeSelectors.forEach((volume, volumeIndex) => {
            listenTypeSelectors.forEach(unit => {
                tempUnitCheckedState[volumeIndex].push(false)
            });
        });

        setVolumeLessonList(tempVolumeLessonList)
        setVolumeLessonCheckedState(tempLessonCheckedState)
        setVolumeUnitCheckedState(tempUnitCheckedState)

    }, [listenTypeSelectors, volumeSelectors])

    //在讀取一開始 如果沒有search query 並且 數字在範圍內 顯示該menu
    useEffect(() => {
        setActiveVolume(0)
        location.search.length === 0 && _.toInteger(volumeNum) <= 5 && setActiveVolume(_.toInteger(volumeNum))
    }, [])


    //根據 url 在冊次或是網址更新的時候(如果有query search 將選單隱藏 抓資料)
    useEffect(() => {

        const feachData = async () => {
            let result = await axios.get(`${constConfig.API_URL}/volume/${volumeNum}/packs/query?domain=${constConfig.EDU_DOMAIN}&${location.search.substring(1)}`)
            dispatch(getLessons(result.data))
        }

        if (location.search.length > 0) {
            setActiveVolume(0)
            feachData()
        }

    }, [location.search, volumeNum, dispatch])

    const handleMenuClicked = (e) => {

        _.toInteger(e.target.id[6]) === activeVolume ? setActiveVolume(0) : setActiveVolume(_.toInteger(e.target.id[6]))

    }

    const handleLessonChangeStatus = (volume, optionIndex) => {
        let tempLessonCheckedState = [...volumeLessonCheckedState]
        tempLessonCheckedState[volume - 1][optionIndex] = !tempLessonCheckedState[volume - 1][optionIndex]
        setVolumeLessonCheckedState(tempLessonCheckedState)
    }

    const handleUnitChangeStatus = (volume, optionIndex) => {
        let tempUnitCheckedState = [...volumeUnitCheckedState]
        tempUnitCheckedState[volume - 1][optionIndex] = !tempUnitCheckedState[volume - 1][optionIndex]
        setVolumeUnitCheckedState(tempUnitCheckedState)
    }

    const handleSelectAndCancelAll = (selectOrCancel, volume, optionGroup) => {

        if (optionGroup === "lesson") {
            let tempLessonCheckedState = [...volumeLessonCheckedState]
            tempLessonCheckedState[_.toInteger(volume) - 1] = tempLessonCheckedState[_.toInteger(volume) - 1].map(() => selectOrCancel === "select" ? true : false)
            setVolumeLessonCheckedState(tempLessonCheckedState)
        }

        if (optionGroup === "unit") {
            let tempUnitCheckedState = [...volumeUnitCheckedState]
            tempUnitCheckedState[_.toInteger(volume) - 1] = tempUnitCheckedState[_.toInteger(volume) - 1].map(() => selectOrCancel === "select" ? true : false)
            setVolumeUnitCheckedState(tempUnitCheckedState)
        }

    }

    const handleSubmitClicked = (volume) => {

        let lessonNums = []
        let units = []

        volumeLessonCheckedState[_.toInteger(volume) - 1].forEach((lessonCheckedState, index) => {
            lessonNums.indexOf(volumeLessonList[_.toInteger(volume) - 1][index]) === -1 && lessonCheckedState && lessonNums.push(volumeLessonList[_.toInteger(volume) - 1][index])
        });
        volumeUnitCheckedState[_.toInteger(volume) - 1].forEach((unitCheckedState, index) => {
            unitCheckedState && units.push(listenTypeSelectors[index].code)
        });

        setPlayIndex(0)
        setStartPlaying(false)
        stop()

        history.push(`/listen/${volume}?lessonNums=${lessonNums.join(",")}&units=${units.join(",")}`)
    }


    return (
        <React.Fragment>
            <section className="section-header">
                <div className="navbar-sub">
                    <div className="row" id="level">
                        <div className="col">
                            <div className="container">
                                <div className="row">
                                    <ul className="w-100 nav nav-fill level" id="menu">
                                        {volumeSelectors.map((volume, index) => (
                                            <li
                                                key={index}
                                                id={`volume-${volume.number}`}
                                                className={activeVolume === _.toInteger(volume.number) ? "dropdown show" : "dropdown"}
                                            >
                                                <div
                                                    id={`volume${volume.number}`}
                                                    className="nav-link dropdown-toggle"
                                                    role="button"
                                                    aria-expanded="false"
                                                    onClick={(e) => { handleMenuClicked(e) }}
                                                >
                                                    {volume.name}
                                                    <FontAwesomeIcon icon={activeVolume === _.toInteger(volume.number) ? faChevronUp : faChevronDown} />
                                                </div>
                                                <div
                                                    className={activeVolume === _.toInteger(volume.number) ? "dropdown-menu show" : "dropdown-menu"}
                                                    aria-labelledby={`volume${volume.number}`}
                                                >
                                                    <div className="container">
                                                        <div className="row">
                                                            <div className="col d-flex align-items-center">
                                                                <h3><FontAwesomeIcon icon={faBook} /> 課次</h3>
                                                                <div className="select-all-btn-block">
                                                                    [
                                                                    <span className="select-all-btn" onClick={() => { handleSelectAndCancelAll('select', volume.number, 'lesson') }}>全選</span>
                                                                    /
                                                                    <span className="cancel-all-btn" onClick={() => { handleSelectAndCancelAll('cancel', volume.number, 'lesson') }}>取消</span>
                                                                    ]
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row lesson-block">
                                                            {volume.lessonSelectors.map((lesson, index) => (
                                                                <div
                                                                    key={index}
                                                                    className="form-check form-check-inline col-6 col-md-2"
                                                                >
                                                                    <input
                                                                        className="form-check-input checkClass"
                                                                        type="checkbox"
                                                                        value={lesson.number}
                                                                        name={lesson.number}
                                                                        checked={volumeLessonCheckedState[volume.number - 1][index] || false}
                                                                        onChange={() => handleLessonChangeStatus(volume.number, index)}
                                                                    />
                                                                    <label className="form-check-label" htmlFor={lesson.number}>{lesson.name}</label>
                                                                </div>
                                                            )
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="dropdown-divider"></div>
                                                    <div className="container">
                                                        <div className="row">
                                                            <div className="col d-flex align-items-center">
                                                                <h3><FontAwesomeIcon icon={faBookmark} /> 單元</h3>
                                                                <div className="select-all-btn-block">
                                                                    [
                                                                    <span className="select-all-btn" onClick={() => { handleSelectAndCancelAll('select', volume.number, 'unit') }}>全選</span>
                                                                    /
                                                                    <span className="cancel-all-btn" onClick={() => { handleSelectAndCancelAll('cancel', volume.number, 'unit') }}>取消</span>
                                                                    ]
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row unit-block">
                                                            {listenTypeSelectors.map((unit, index) => (
                                                                <div key={index} className="form-check form-check-inline col-6 col-md-2">
                                                                    <input
                                                                        className="form-check-input checkClass"
                                                                        type="checkbox"
                                                                        id={`${volume.name}_${unit.code}`}
                                                                        value={`${volume.name}_${unit.code}`}
                                                                        name={`${volume.name}_${unit.code}`}
                                                                        checked={volumeUnitCheckedState[volume.number - 1][index] || false}
                                                                        onChange={() => handleUnitChangeStatus(volume.number, index)}
                                                                    />
                                                                    <label className="form-check-label" htmlFor={`${volume.name}_${unit.code}`}>{unit.name}</label>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="dropdown-divider"></div>
                                                    <div className="container">
                                                        <div className="row">
                                                            <div className="col-12 d-flex justify-content-end">
                                                                <button type="button" name="button" className="btn btn-round btn-primary" onClick={() => { handleSubmitClicked(volume.number) }}>確定</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
}

export default Menu;