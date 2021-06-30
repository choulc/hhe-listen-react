import React from 'react';

const IndexFooter = () => {
    return (
        <React.Fragment>
            <div className="intro-footer">
                <div className="row align-items-center justify-content-center">
                    <div className="col-12 col-xl-8 col-lg-11 col-md-10 col-sm-10 col-xs-12 mx-auto my-2">
                        <p className="text-center notice">為獲得最佳瀏覽體驗，建議您使用瀏覽器軟體 IE Edge或 Google Chrome、Firefox<br />
                            如使用IE瀏覽器瀏覽本行網站，可能部分網頁的呈現會有破圖或版面跑版的情況，某些網頁互動功能無法正確顯示與使用。</p>
                    </div>
                </div>
                <footer>
                    <div className="container text-center">
                        <p>Copyright © {new Date().getFullYear()}Hanlin 翰林出版事業股份有限公司</p>
                    </div>
                </footer>
            </div>
        </React.Fragment>
    );
}

export default IndexFooter;