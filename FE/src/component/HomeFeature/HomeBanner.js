import React, { useEffect, useState } from 'react';

import './HomeBanner.scss';
import { Link } from 'react-router-dom';
function HomeBanner(props) {


    return (

        <section className="home_banner_area mb-40" >
            {/* class home_banner_area trong file style.css chứa background banner  */}
            <div className="box-banner effect-v7" style={{ backgroundImage: `url(${props.image})`, backgroundPosition: 'center' }}>
                <div className="banner_inner d-flex align-items-center">
                    <div className="container">
                        <div className="banner_content row">
                            <div className="col-lg-12">
                                {/* <p className="sub text-uppercase">{props.name}</p> */}
                                {/* <h3><span>Number 1</span> Electronics <br />Supermarket <span>System</span></h3> */}
                                <h4>Chào mừng đến với cửa hàng của chúng tôi</h4>
                                <Link className="main_btn mt-40" to={"/shop"}>Mua sắm ngay</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );

}

export default HomeBanner;