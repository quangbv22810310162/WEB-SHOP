import React from 'react';
import VoucherItem from '../../container/Voucher/VoucherItem';
import HeaderContent from '../Content/HeaderContent';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './HomeVoucher.scss';
import CommonUtils from '../../utils/CommonUtils';

function FeatureVoucherItem(props) {
    let settings = {
        dots: false,
        Infinity: false,
        speed: 500,
        autoplaySpeed: 1000,
        autoplay: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 768, // Điểm ngắt màn hình nhỏ hơn 768px
                settings: {
                    slidesToShow: 2, // Hiển thị 1 mục
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1024, // Điểm ngắt màn hình nhỏ hơn 768px
                settings: {
                    slidesToShow: 3, // Hiển thị 1 mục
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 481, // Điểm ngắt màn hình nhỏ hơn 768px
                settings: {
                    slidesToShow: 1, // Hiển thị 1 mục
                    slidesToScroll: 1,
                },
            },

        ],
    }

    return (
        <section className="feature_product_area section_gap_bottom_custom ">
            <div className="container">
                <HeaderContent
                    mainContent={props.title}
                    infoContent={props.description}
                />
                <div className="row box-vc">
                    <div className="col-lg-3 col-md-3"></div>
                    <a href='/voucher'>
                        {props.data && props.data.length > 0 ? (
                            <Slider {...settings}>
                                {props.data.map((item, index) => {
                                    let percent = ""
                                    if (item.typeVoucherOfVoucherData.typeVoucher === "percent") {
                                        percent = item.typeVoucherOfVoucherData.value + "%"
                                    }
                                    if (item.typeVoucherOfVoucherData.typeVoucher === "money") {
                                        percent = CommonUtils.formatter.format(item.typeVoucherOfVoucherData.value)

                                    }
                                    let MaxValue = item.typeVoucherOfVoucherData.maxValue

                                    return (
                                        <VoucherItem
                                            width="280px" height="180px"
                                            key={index}
                                            id={item.id}
                                            name={item.codeVoucher}
                                            widthPercent={item.usedAmount * 100 / item.amount} maxValue={MaxValue}
                                            typeVoucher={percent}
                                            usedAmount={Math.round((item.usedAmount * 100 / item.amount) * 10) / 10}
                                        />
                                    );
                                })}
                            </Slider>
                        ) : (
                            <p className="no-vouchers-message">No vouchers available at the moment.</p>
                        )}
                    </a>
                </div>


            </div>
        </section>
    );
}

FeatureVoucherItem.defaultProps = {
    title: 'Featured Vouchers',
    data: [],
};

export default FeatureVoucherItem;