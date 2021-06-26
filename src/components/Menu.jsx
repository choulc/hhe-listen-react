import { toInteger } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'

const Menu = () => {

    const { volumeNum } = useParams()
    const [activeVolume, setActiveVolume] = useState(0)
    const volumeSelectors = useSelector((state) => state.menu.volumeSelectors)
    const listenTypeSelectors = useSelector((state) => state.menu.listenTypeSelectors)

    useEffect(() => {
        toInteger(volumeNum) <= 5 && setActiveVolume(toInteger(volumeNum))
    }, [volumeNum])

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
                                            <li key={index} id={`volume-${volume.number}`} className={activeVolume === toInteger(volume.number) ? "dropdown show" : "dropdown"}>
                                                <Link className="nav-link dropdown-toggle" to="#" id={`volume${volume.number}`} role="button" aria-expanded="false" onClick={handleMenuClicked}>
                                                    {volume.name} <FontAwesomeIcon icon={activeVolume === toInteger(volume.number) ? faChevronUp : faChevronDown} />
                                                </Link>
                                                <div className={activeVolume === toInteger(volume.number) ? "dropdown-menu show" : "dropdown-menu"} aria-labelledby={`volume${volume.number}`}>
                                                    <div className="container">
                                                        <div className="row">
                                                            <div className="col d-flex align-items-center">
                                                                <h3><i className="fas fa-book"></i> 課次</h3>
                                                                <div className="select-all-btn-block">
                                                                    [ <span className="select-all-btn">全選</span> / <span className="cancel-all-btn">取消</span> ]
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row lesson-block">
                                                            {volume.lessonSelectors.map((lesson, index) => (
                                                                <div key={index} className="form-check form-check-inline col-6 col-md-2">
                                                                    <input className="form-check-input checkClass" type="checkbox" value={lesson.number} />
                                                                    <label className="form-check-label" htmlFor={lesson.number}>{lesson.name}</label>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="dropdown-divider"></div>
                                                    <div className="container">
                                                        <div className="row">
                                                            <div className="col d-flex align-items-center">
                                                                <h3><i className="fas fa-bookmark"></i> 單元</h3>
                                                                <div className="select-all-btn-block">
                                                                    [ <span className="select-all-btn">全選</span> / <span className="cancel-all-btn">取消</span> ]
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row unit-block">
                                                            {listenTypeSelectors.map((unit, index) => (
                                                                <div key={index} className="form-check form-check-inline col-6 col-md-2">
                                                                    <input className="form-check-input checkClass" type="checkbox" id="vocabulary" value="vocabulary" />
                                                                    <label className="form-check-label" htmlFor="vocabulary">{unit.name}</label>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="dropdown-divider"></div>
                                                    <div className="container">
                                                        <div className="row">
                                                            <div className="col-12">
                                                                <button type="button" name="button" className="float-right btn btn-round btn-primary">確定</button>
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