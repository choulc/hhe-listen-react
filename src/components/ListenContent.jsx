import React from 'react';
import LessonAnimation from './LessonAnimation';
import ListenList from './ListenList';
import SupportVideo from './SupportVideo';

const ListenContent = () => {
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
                                    <ListenList />
                                    <div id="not-found-block" class="hide">您所查詢的資料無相關單元</div>
                                    <div id="zip-btn" class="btn btn-primary btn-round">全部下載</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </React.Fragment>
    );
}

export default ListenContent;