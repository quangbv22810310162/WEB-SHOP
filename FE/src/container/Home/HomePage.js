import React, { useState, useEffect } from 'react';
import HomeBanner from "../../component/HomeFeature/HomeBanner";
import MainFeature from "../../component/HomeFeature/MainFeature";
import ProductFeature from "../../component/HomeFeature/ProductFeature";
import Voucher from "../../component/HomeFeature/HomeVoucher";
import NewProductFeature from "../../component/HomeFeature/NewProductFeature"
import HomeBlog from '../../component/HomeFeature/HomeBlog';

import { getAllBanner, getProductFeatureService, getProductNewService, getNewBlog, getProductRecommendService, getAllProductshirt, getAllProductdress, getAllVoucher, getAllProductTrousers } from '../../services/userService';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './HomePage.scss';

function HomePage(props) {
    const [dataProductFeature, setDataProductFeature] = useState([])
    const [dataNewProductFeature, setNewProductFeature] = useState([])
    const [dataNewProductshirt, setDataProductshirt] = useState([])
    const [dataProductdress, setDataProductdress] = useState([])
    const [dataVoucher, setDataVoucher] = useState([])
    const [dataProductTrousers, setDataProductTrousers] = useState([])

    
    const [dataNewBlog, setdataNewBlog] = useState([])
    const [dataBanner, setdataBanner] = useState([])
    const [dataProductRecommend, setdataProductRecommend] = useState([])
    let settings = {
        dots: false,
        Infinity: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplaySpeed: 2000,
        autoplay: true,
        cssEase: "linear"
    }

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (userData) {
            fetchProductRecommend(userData.id)

        }
        fetchBlogFeature()
        fetchDataBrand()
        fetchProductFeature()
        fetchProductshirt()
        fetchProductNew()
        fetchProductdress()
        fetchVocher()
        fetchProductTrousers()
        window.scrollTo(0, 0);
    }, [])
    let fetchBlogFeature = async () => {
        let res = await getNewBlog(3)
        if (res && res.errCode === 0) {
            setdataNewBlog(res.data)
        }
    }
    let fetchVocher = async () => {
        try {
            let res = await getAllVoucher({ limit: 6, offset: 0 });
            if (res && res.errCode === 0) {
                setDataVoucher(res.data);
            }
        } catch (error) {
            console.error("Error fetching vouchers:", error);
        }
    }
    let fetchProductFeature = async () => {
        let res = await getProductFeatureService(6)
        if (res && res.errCode === 0) {
            setDataProductFeature(res.data)
        }
    }
    let fetchProductshirt = async () => {
        let res = await getAllProductshirt(6)
        if (res && res.errCode === 0) {
            setDataProductshirt(res.data)
        }
    }
    let fetchProductdress = async () => {
        let res = await getAllProductdress(6)
        if (res && res.errCode === 0) {
            setDataProductdress(res.data)
        }
    }
    let fetchProductTrousers = async () => {
        let res = await getAllProductTrousers(6)
        if (res && res.errCode === 0) {
            setDataProductTrousers(res.data)
        }
    }
    let fetchProductRecommend = async (userId) => {
        let res = await getProductRecommendService({
            limit: 20,
            userId: userId
        })
        if (res && res.errCode === 0) {
            setdataProductRecommend(res.data)
        }
    }
    let fetchDataBrand = async () => {
        let res = await getAllBanner({
            limit: 6,
            offset: 0,
            keyword: ''
        })
        if (res && res.errCode === 0) {
            setdataBanner(res.data)
        }
    }
    let fetchProductNew = async () => {
        let res = await getProductNewService(8)
        if (res && res.errCode === 0) {
            setNewProductFeature(res.data)
        }
    }
    return (

        <div>
            <div className="mx-auto row d-block d-flex justify-content-center">
                <div >
                    <Slider {...settings}>
                        {dataBanner && dataBanner.length > 0 &&
                            dataBanner.map((item, index) => {
                                return (
                                    <HomeBanner key={index} image={item.image} name={item.name}></HomeBanner>
                                )
                            })
                        }
                    </Slider>
                </div>
               
            </div>
            <Voucher title={"Khuyến mãi"} description="Mã giảm giá hấp dẫn" data={dataVoucher}></Voucher>
            <NewProductFeature title="Sản phẩm mới" description="Sản phẩm mới ra mắt" data={dataNewProductFeature}></NewProductFeature>
            <MainFeature title={"TẠI SAO CHỌN CHÚNG TÔI"}></MainFeature>
            <ProductFeature title={"Sản phẩm nổi bật"} description="Bạn sẽ không thất vọng với lựa chọn của mình" data={dataProductFeature}></ProductFeature>
            {/* <ProductFeature title={"Váy dành cho phụ nữ"} description="Bạn sẽ không thất vọng với lựa chọn của mình" data={dataProductdress}></ProductFeature>
            <ProductFeature title={"Áo dành cho phụ nữ"} description="Bạn sẽ không thất vọng với lựa chọn của mình" data={dataNewProductshirt}></ProductFeature>
            <ProductFeature title={"Quần dành cho phụ nữ"} description="Bạn sẽ không thất vọng với lựa chọn của mình" data={dataProductTrousers}></ProductFeature>

            
            <HomeBlog data={dataNewBlog} /> */}
        </div>
    );
}

export default HomePage;