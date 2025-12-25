import React from 'react';
import CountUp from 'react-countup';
import HeaderContent from '../Content/HeaderContent';

function MainFeature(props) {
  return (
      <section className="feature-area section_gap_bottom_custom">
        <div className="container">
        <HeaderContent mainContent={props.title}
                    infoContent={props.description}> </HeaderContent>
          <div className="row">
            <div className="col-lg-3 col-md-12">
              <div className="single-feature">
                <div className="title">
                  <i className="flaticon-money"></i>
                  <h3>Mua nhiều giảm nhiều</h3>
                </div>
                <p>Giảm đến <CountUp end={80} duration={5}/>%</p>
              </div>
            </div>

            <div className="col-lg-3 col-md-12">
              <div className="single-feature">
                <div className="title">
                  <i className="flaticon-truck"></i>
                  <h3>Miễn phí vận chuyển</h3>
                </div>
                <p>Phạm vi khoảng <CountUp end={10} duration={8}/>km</p>
              </div>
            </div>

            <div className="col-lg-3 col-md-12">
              <div className="single-feature">
                <div className="title">
                  <i className="flaticon-support"></i>
                  <h3>Hỗ trợ 24/7</h3>
                </div>
                <p>Hãy liên hệ với chúng tôi</p>
              </div>
            </div>

            <div className="col-lg-3 col-md-12">
              <div className="single-feature">
                <div className="title">
                  <i className="flaticon-blockchain"></i>
                  <h3>Thanh toán an toàn</h3>
                </div>
                <p>Cổng thanh toán uy tín</p>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}

export default MainFeature;