import React from 'react';
import { Link } from 'react-router-dom'

const ListenFooter = () => {
    return (
        <React.Fragment>
            <footer>
                <div className="container text-center">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-12 col-xl-8 col-lg-11 col-md-10 col-sm-10 col-xs-12 mx-auto my-2">
                            <p className="text-center notice">為獲得最佳瀏覽體驗，建議您使用瀏覽器軟體 IE Edge或 Google Chrome、Firefox<br />
                                如使用IE瀏覽器瀏覽本行網站，可能部分網頁的呈現會有破圖或版面跑版的情況，某些網頁互動功能無法正確顯示與使用。</p>
                            <p className="info">如有問題請詳閱 <Link to="#">操作說明</Link></p>
                        </div>
                    </div>
                    <hr />
                    <p>Copyright © {new Date().getFullYear()} 2021 Hanlin 翰林出版事業股份有限公司</p>
                </div>
            </footer>
        </React.Fragment>
    );
}

export default ListenFooter;