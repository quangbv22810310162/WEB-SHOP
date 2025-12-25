import React, { useEffect, useState } from 'react';
import ItemProduct from '../Product/ItemProduct';
import HeaderContent from '../Content/HeaderContent';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './ProductFeature.scss';
import { getProductFeatureService } from '../../services/userService';
function ProductFeature(props) {
    let settings = {
        dots: false,
        Infinity: false,
        speed: 500,
        autoplaySpeed: 1500,
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

        <section className="feature_product_area section_gap_bottom_custom">
            <div className="container">
                <HeaderContent mainContent={props.title}
                    infoContent={props.description}
                > </HeaderContent>

                <div className="row box-productFeature">
                    <Slider {...settings}>
                        {props.data && props.data.length > 3 &&
                            props.data.map((item, index) => {
                                return (
                                    <ItemProduct id={item.id} key={index} width={100} height={500} name={item.name} img={item.productDetail[0].productImage[0].image}
                                        price={item.productDetail[0].originalPrice} discountPrice={item.productDetail[0].discountPrice}>
                                    </ItemProduct>

                                )
                            })
                        }


                    </Slider>
                </div>



            </div>
        </section>



    );
}

export default ProductFeature;