import React from 'react';
import { useSelector } from 'react-redux';
import LessonAnimation from './LessonAnimation';
import ListenList from './ListenList';
import SupportVideo from './SupportVideo';
import axios from 'axios';
import * as constConfig from '../appConfig'

const ListenContent = (props) => {

    const { lessonList, playIndex, setPlayIndex, playList, setStartPlaying, downloadSrcList } = props
    const isNullListenPacks = useSelector(state => state.listen.isNullListenPacks)

    const handleZipDownladClicked = (e) => {

        document.getElementById("mask").classList.remove("hide")

        let files = downloadSrcList.map(url => url.substr(url.indexOf("音檔/") + 3))
        let data = {
            bucket: "hanlin-listening",
            folder: `${constConfig.EDU_DOMAIN}/音檔/`,
            files: files
        }
        let result = {}

        axios.post(constConfig.ZIP_DOWNLOAD_API_URL, data)
            .then((response) => {
                result = response.data
            }).then(() => {
                if (result.Location === undefined) {
                    alert("下載容量過大，請縮小搜尋範圍重新操作");
                } else {
                    window.location.href = result.Location
                }
            }).then(() => {
                document.getElementById("mask").classList.add("hide")
            })
    }

    return (
        <React.Fragment>
            <section className="section-content">
                <div className="container">
                    <div className="row">
                        <div className="col w-100">
                            <div className="row player">
                                <div id="wrapper" className="col-11 mx-auto">
                                    <div id="ani-menu-container">
                                        <LessonAnimation />
                                        <SupportVideo />
                                    </div>
                                    <ListenList
                                        lessonList={lessonList}
                                        playIndex={playIndex}
                                        setPlayIndex={setPlayIndex}
                                        playList={playList}
                                        setStartPlaying={setStartPlaying}
                                    />
                                    <div id="not-found-block" className={`${!isNullListenPacks ? 'hide' : ''}`}>您所查詢的單元沒有相關音檔資料</div>
                                    <div id="zip-btn" className={`btn btn-primary btn-round ${isNullListenPacks ? 'hide' : ''}`} onClick={() => { handleZipDownladClicked() }}>全部下載</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
            <div id="mask" className="hide">
                <div id="mask-text-block">
                    <div id="mask-text">
                        處理中，請稍候...
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default ListenContent;