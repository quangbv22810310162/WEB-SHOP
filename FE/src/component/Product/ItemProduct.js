import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CommonUtils from '../../utils/CommonUtils';
import './ItemProduct.scss';
import Marquee from "react-fast-marquee";

function ItemProduct(props) {
    const [isHovered, setIsHovered] = useState(false);
    const percentDiscount = Math.round(((props.price - props.discountPrice) / props.price) * 100);

    return (
        <div 
            className={props.type}
            onMouseEnter={() => setIsHovered(true)} 
            onMouseLeave={() => setIsHovered(false)}
        >
            <div style={{ cursor: 'pointer' }} className="single-product">
                <div className="percent-pr">
                    {percentDiscount > 0 && `-${percentDiscount}%`}
                </div>
                <Link to={`/detail-product/${props.id}`}>
                    <div style={{ width: '300px', height: '400px' }} className="product-img">
                        <img className="img-fluid w-100" src={props.img} alt="" />
                        <div className="p_icon ">
                            Xem sản phẩm
                        </div>
                    </div>
                    <div style={{ width: '300px', height: '99px' }} className="product-btm">
                        <a className="d-block">
                            {isHovered ? (
                                <Marquee>
                                    <h4>{props.name}</h4>
                                </Marquee>
                            ) : (
                                <h4>{props.name}</h4>
                            )}
                        </a>
                        <div className="mt-3">
                            <span className="mr-4">{CommonUtils.formatter.format(props.discountPrice)}</span>
                            <del>{CommonUtils.formatter.format(props.price)}</del>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default ItemProduct;
