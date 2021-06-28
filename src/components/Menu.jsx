import * as _ from 'lodash';
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { getLessons } from '../store/listenSlice';
import { useAudioPlayer } from 'react-use-audio-player';

const Menu = (props) => {

    const { setPlayIndex, setStartPlaying } = props
    const dispatch = useDispatch()
    const location = useLocation()
    const history = useHistory()
    const { volumeNum } = useParams()
    const [activeVolume, setActiveVolume] = useState(0)
    const volumeSelectors = useSelector(state => state.menu.volumeSelectors)
    const listenTypeSelectors = useSelector(state => state.menu.listenTypeSelectors)
    const volume1LessonSelectors = useSelector(state => state.menu.volume1LessonSelectors)
    const volume2LessonSelectors = useSelector(state => state.menu.volume2LessonSelectors)
    const volume3LessonSelectors = useSelector(state => state.menu.volume3LessonSelectors)
    const volume4LessonSelectors = useSelector(state => state.menu.volume4LessonSelectors)
    const volume5LessonSelectors = useSelector(state => state.menu.volume5LessonSelectors)
    const [volume1LessonCheckedStatus, setVolume1LessonCheckedStatus] = useState([])
    const [volume2LessonCheckedStatus, setVolume2LessonCheckedStatus] = useState([])
    const [volume3LessonCheckedStatus, setVolume3LessonCheckedStatus] = useState([])
    const [volume4LessonCheckedStatus, setVolume4LessonCheckedStatus] = useState([])
    const [volume5LessonCheckedStatus, setVolume5LessonCheckedStatus] = useState([])
    const [volume1UnitCheckedStatus, setVolume1UnitCheckedStatus] = useState([])
    const [volume2UnitCheckedStatus, setVolume2UnitCheckedStatus] = useState([])
    const [volume3UnitCheckedStatus, setVolume3UnitCheckedStatus] = useState([])
    const [volume4UnitCheckedStatus, setVolume4UnitCheckedStatus] = useState([])
    const [volume5UnitCheckedStatus, setVolume5UnitCheckedStatus] = useState([])
    const { stop } = useAudioPlayer()

    useEffect(() => {
        setVolume1LessonCheckedStatus(new Array(volume1LessonSelectors.length).fill(false))
        setVolume2LessonCheckedStatus(new Array(volume2LessonSelectors.length).fill(false))
        setVolume3LessonCheckedStatus(new Array(volume3LessonSelectors.length).fill(false))
        setVolume4LessonCheckedStatus(new Array(volume4LessonSelectors.length).fill(false))
        setVolume5LessonCheckedStatus(new Array(volume5LessonSelectors.length).fill(false))
        setVolume1UnitCheckedStatus(new Array(listenTypeSelectors.length).fill(false))
        setVolume2UnitCheckedStatus(new Array(listenTypeSelectors.length).fill(false))
        setVolume3UnitCheckedStatus(new Array(listenTypeSelectors.length).fill(false))
        setVolume4UnitCheckedStatus(new Array(listenTypeSelectors.length).fill(false))
        setVolume5UnitCheckedStatus(new Array(listenTypeSelectors.length).fill(false))
    }, [volume1LessonSelectors.length, volume2LessonSelectors.length, volume3LessonSelectors.length, volume4LessonSelectors.length, volume5LessonSelectors.length, listenTypeSelectors.length])

    //在讀取一開始 如果沒有search query 並且 數字在範圍內 顯示該menu
    useEffect(() => {
        setActiveVolume(0)
        location.search.length === 0 && _.toInteger(volumeNum) <= 5 && setActiveVolume(_.toInteger(volumeNum))
    }, [])


    //根據 url 在冊次或是網址更新的時候(如果有query search 將選單隱藏 抓資料)
    useEffect(() => {

        const feachData = async () => {
            let result = await axios.get(`https://listenapi.hle.com.tw/volume/${volumeNum}/packs/query?domain=hhe&${location.search.substring(1)}`)
            dispatch(getLessons(result.data))
        }

        if (location.search.length > 0) {
            setActiveVolume(0)
            feachData()
        }

    }, [location.search, volumeNum, dispatch])

    const handleMenuClicked = (e) => {

        switch (e.target.id) {
            case "volume1":
                activeVolume === 1 ? setActiveVolume(0) : setActiveVolume(1)
                break;
            case "volume2":
                activeVolume === 2 ? setActiveVolume(0) : setActiveVolume(2)
                break;
            case "volume3":
                activeVolume === 3 ? setActiveVolume(0) : setActiveVolume(3)
                break;
            case "volume4":
                activeVolume === 4 ? setActiveVolume(0) : setActiveVolume(4)
                break;
            case "volume5":
                activeVolume === 5 ? setActiveVolume(0) : setActiveVolume(5)
                break;

            default:
                break;
        }
    }

    const handleLessonChangeStatus = (volume, optionIndex) => {
        let updatedCheckedStatus
        switch (volume) {
            case "1":
                updatedCheckedStatus = volume1LessonCheckedStatus.map((bool, index) => (
                    optionIndex === index ? !bool : bool
                ))
                setVolume1LessonCheckedStatus(updatedCheckedStatus)
                break;
            case "2":
                updatedCheckedStatus = volume2LessonCheckedStatus.map((bool, index) => (
                    optionIndex === index ? !bool : bool
                ))
                setVolume2LessonCheckedStatus(updatedCheckedStatus)
                break;
            case "3":
                updatedCheckedStatus = volume3LessonCheckedStatus.map((bool, index) => (
                    optionIndex === index ? !bool : bool
                ))
                setVolume3LessonCheckedStatus(updatedCheckedStatus)
                break;
            case "4":
                updatedCheckedStatus = volume4LessonCheckedStatus.map((bool, index) => (
                    optionIndex === index ? !bool : bool
                ))
                setVolume4LessonCheckedStatus(updatedCheckedStatus)
                break;
            case "5":
                updatedCheckedStatus = volume5LessonCheckedStatus.map((bool, index) => (
                    optionIndex === index ? !bool : bool
                ))
                setVolume5LessonCheckedStatus(updatedCheckedStatus)
                break;

            default:
                break;
        }
    }

    const handleLessonChecked = (volume, optionIndex) => {
        let result
        switch (volume) {
            case "1":
                result = volume1LessonCheckedStatus[optionIndex]
                break;
            case "2":
                result = volume2LessonCheckedStatus[optionIndex]
                break;
            case "3":
                result = volume3LessonCheckedStatus[optionIndex]
                break;
            case "4":
                result = volume4LessonCheckedStatus[optionIndex]
                break;
            case "5":
                result = volume5LessonCheckedStatus[optionIndex]
                break;
            default:
                break;
        }
        return result
    }

    const handleUnitChangeStatus = (volume, optionIndex) => {
        let updatedCheckedStatus
        switch (volume) {
            case "1":
                updatedCheckedStatus = volume1UnitCheckedStatus.map((bool, index) => (
                    optionIndex === index ? !bool : bool
                ))
                setVolume1UnitCheckedStatus(updatedCheckedStatus)
                break;
            case "2":
                updatedCheckedStatus = volume2UnitCheckedStatus.map((bool, index) => (
                    optionIndex === index ? !bool : bool
                ))
                setVolume2UnitCheckedStatus(updatedCheckedStatus)
                break;
            case "3":
                updatedCheckedStatus = volume3UnitCheckedStatus.map((bool, index) => (
                    optionIndex === index ? !bool : bool
                ))
                setVolume3UnitCheckedStatus(updatedCheckedStatus)
                break;
            case "4":
                updatedCheckedStatus = volume4UnitCheckedStatus.map((bool, index) => (
                    optionIndex === index ? !bool : bool
                ))
                setVolume4UnitCheckedStatus(updatedCheckedStatus)
                break;
            case "5":
                updatedCheckedStatus = volume5UnitCheckedStatus.map((bool, index) => (
                    optionIndex === index ? !bool : bool
                ))
                setVolume5UnitCheckedStatus(updatedCheckedStatus)
                break;

            default:
                break;
        }
    }

    const handleUnitChecked = (volume, optionIndex) => {
        let result
        switch (volume) {
            case "1":
                result = volume1UnitCheckedStatus[optionIndex]
                break;
            case "2":
                result = volume2UnitCheckedStatus[optionIndex]
                break;
            case "3":
                result = volume3UnitCheckedStatus[optionIndex]
                break;
            case "4":
                result = volume4UnitCheckedStatus[optionIndex]
                break;
            case "5":
                result = volume5UnitCheckedStatus[optionIndex]
                break;
            default:
                break;
        }
        return result
    }

    const handleSelectAndCancelAll = (selectOrCancel, volume, optionGroup) => {
        switch (volume) {
            case '1':
                selectOrCancel === "select" && optionGroup === "lesson" && setVolume1LessonCheckedStatus(new Array(volume1LessonSelectors.length).fill(true))
                selectOrCancel === "select" && optionGroup === "unit" && setVolume1UnitCheckedStatus(new Array(listenTypeSelectors.length).fill(true))
                selectOrCancel === "cancel" && optionGroup === "lesson" && setVolume1LessonCheckedStatus(new Array(volume1LessonSelectors.length).fill(false))
                selectOrCancel === "cancel" && optionGroup === "unit" && setVolume1UnitCheckedStatus(new Array(listenTypeSelectors.length).fill(false))
                break;
            case '2':
                selectOrCancel === "select" && optionGroup === "lesson" && setVolume2LessonCheckedStatus(new Array(volume2LessonSelectors.length).fill(true))
                selectOrCancel === "select" && optionGroup === "unit" && setVolume2UnitCheckedStatus(new Array(listenTypeSelectors.length).fill(true))
                selectOrCancel === "cancel" && optionGroup === "lesson" && setVolume2LessonCheckedStatus(new Array(volume2LessonSelectors.length).fill(false))
                selectOrCancel === "cancel" && optionGroup === "unit" && setVolume2UnitCheckedStatus(new Array(listenTypeSelectors.length).fill(false))
                break;
            case '3':
                selectOrCancel === "select" && optionGroup === "lesson" && setVolume3LessonCheckedStatus(new Array(volume3LessonSelectors.length).fill(true))
                selectOrCancel === "select" && optionGroup === "unit" && setVolume3UnitCheckedStatus(new Array(listenTypeSelectors.length).fill(true))
                selectOrCancel === "cancel" && optionGroup === "lesson" && setVolume3LessonCheckedStatus(new Array(volume3LessonSelectors.length).fill(false))
                selectOrCancel === "cancel" && optionGroup === "unit" && setVolume3UnitCheckedStatus(new Array(listenTypeSelectors.length).fill(false))
                break;
            case '4':
                selectOrCancel === "select" && optionGroup === "lesson" && setVolume4LessonCheckedStatus(new Array(volume4LessonSelectors.length).fill(true))
                selectOrCancel === "select" && optionGroup === "unit" && setVolume4UnitCheckedStatus(new Array(listenTypeSelectors.length).fill(true))
                selectOrCancel === "cancel" && optionGroup === "lesson" && setVolume4LessonCheckedStatus(new Array(volume4LessonSelectors.length).fill(false))
                selectOrCancel === "cancel" && optionGroup === "unit" && setVolume4UnitCheckedStatus(new Array(listenTypeSelectors.length).fill(false))
                break;
            case '5':
                selectOrCancel === "select" && optionGroup === "lesson" && setVolume5LessonCheckedStatus(new Array(volume5LessonSelectors.length).fill(true))
                selectOrCancel === "select" && optionGroup === "unit" && setVolume5UnitCheckedStatus(new Array(listenTypeSelectors.length).fill(true))
                selectOrCancel === "cancel" && optionGroup === "lesson" && setVolume5LessonCheckedStatus(new Array(volume5LessonSelectors.length).fill(false))
                selectOrCancel === "cancel" && optionGroup === "unit" && setVolume5UnitCheckedStatus(new Array(listenTypeSelectors.length).fill(false))
                break;

            default:
                break;
        }
    }

    const handleSubmitClicked = (volume) => {
        let lessonNums = []
        let units = []
        switch (volume) {
            case "1":
                lessonNums = _.compact(volume1LessonCheckedStatus.map((lessonStatus, index) => (lessonStatus === true ? volume1LessonSelectors[index].number : '')))
                units = _.compact(volume1UnitCheckedStatus.map((unitStatus, index) => (unitStatus === true ? listenTypeSelectors[index].code : '')))
                break;
            case "2":
                lessonNums = _.compact(volume2LessonCheckedStatus.map((lessonStatus, index) => (lessonStatus === true ? volume2LessonSelectors[index].number : '')))
                units = _.compact(volume2UnitCheckedStatus.map((unitStatus, index) => (unitStatus === true ? listenTypeSelectors[index].code : '')))
                break;
            case "3":
                lessonNums = _.compact(volume3LessonCheckedStatus.map((lessonStatus, index) => (lessonStatus === true ? volume3LessonSelectors[index].number : '')))
                units = _.compact(volume3UnitCheckedStatus.map((unitStatus, index) => (unitStatus === true ? listenTypeSelectors[index].code : '')))
                break;
            case "4":
                lessonNums = _.compact(volume4LessonCheckedStatus.map((lessonStatus, index) => (lessonStatus === true ? volume4LessonSelectors[index].number : '')))
                units = _.compact(volume4UnitCheckedStatus.map((unitStatus, index) => (unitStatus === true ? listenTypeSelectors[index].code : '')))
                break;
            case "5":
                lessonNums = _.compact(volume5LessonCheckedStatus.map((lessonStatus, index) => (lessonStatus === true ? volume5LessonSelectors[index].number : '')))
                units = _.compact(volume5UnitCheckedStatus.map((unitStatus, index) => (unitStatus === true ? listenTypeSelectors[index].code : '')))
                break;

            default:
                break;
        }
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
                                            <li key={index} id={`volume-${volume.number}`} className={activeVolume === _.toInteger(volume.number) ? "dropdown show" : "dropdown"}>
                                                <div className="nav-link dropdown-toggle" id={`volume${volume.number}`} role="button" aria-expanded="false" onClick={(e) => { handleMenuClicked(e) }}>
                                                    {volume.name} <FontAwesomeIcon icon={activeVolume === _.toInteger(volume.number) ? faChevronUp : faChevronDown} />
                                                </div>
                                                <div className={activeVolume === _.toInteger(volume.number) ? "dropdown-menu show" : "dropdown-menu"} aria-labelledby={`volume${volume.number}`}>
                                                    <div className="container">
                                                        <div className="row">
                                                            <div className="col d-flex align-items-center">
                                                                <h3><i className="fas fa-book"></i> 課次</h3>
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
                                                                <div key={index} className="form-check form-check-inline col-6 col-md-2">
                                                                    <input className="form-check-input checkClass" type="checkbox" value={lesson.number} name={lesson.number} checked={handleLessonChecked(volume.number, index) || false} onChange={() => handleLessonChangeStatus(volume.number, index)} />
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
                                                                <h3><i className="fas fa-bookmark"></i> 單元</h3>
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
                                                                    <input className="form-check-input checkClass" type="checkbox" id={`${volume.name}_${unit.code}`} value={`${volume.name}_${unit.code}`} name={`${volume.name}_${unit.code}`} checked={handleUnitChecked(volume.number, index) || false} onChange={() => handleUnitChangeStatus(volume.number, index)} />
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