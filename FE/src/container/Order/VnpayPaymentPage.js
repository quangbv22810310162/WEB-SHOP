import React, { useEffect, useState } from 'react';
import { Link, NavLink, useHistory, useParams, useLocation } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';

import {
    paymentOrderVnpayService,
    paymentOrderVnpaySuccessService
} from '../../services/userService';
import './OrderHomePage.scss';
import logo from '../../../src/resources/img/logo.webp'
import { toast } from 'react-toastify';

import CommonUtils from '../../utils/CommonUtils';

function VnpayPaymentPage(props) {
    const [inputValues, setInputValues] = useState({
        orderType: 'billpayment', 
        orderDescription: 'Thanh toán đơn hàng tại Shop', 
        bankCode: 'VNPAYQR', 
        language: 'vn', 
        amount: ''
    });
    const [showQRCode, setShowQRCode] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const location = useLocation();
    const history = useHistory();
    
    // Thông tin tài khoản VNPay
    const vnpayAccount = {
        name: 'BÙI VĂN QUANG',
        phone: '0364256550'
    };
    
    // Tạo nội dung QR code (có thể là thông tin thanh toán VNPay)
    const getQRCodeValue = () => {
        const amount = inputValues.amount || '0';
        // Format theo chuẩn VNPay hoặc thông tin cần thiết
        return `VNPAY|${vnpayAccount.name}|${vnpayAccount.phone}|${amount}`;
    };
    const handleOnChange = event => {
        const { name, value } = event.target;
        if (name == "amount") {
            return;
        }
        setInputValues({ ...inputValues, [name]: value });

    };
    useEffect(() => {
        if (location && location.orderData) {
            setInputValues({ ...inputValues, ["amount"]: location.orderData.total });
        }



    }, [location])
    let handleOnclick = async () => {
        // Nếu chọn VNPAYQR, hiển thị QR code tĩnh thay vì redirect
        if (inputValues.bankCode === 'VNPAYQR') {
            console.log("orderData", location.orderData)
            localStorage.setItem("orderData", JSON.stringify(location.orderData))
            setShowQRCode(true);
            return;
        }
        
        // Các phương thức thanh toán khác vẫn redirect đến VNPay
        let res = await paymentOrderVnpayService({
            orderType: inputValues.orderType,
            orderDescription: inputValues.orderDescription,
            bankCode: inputValues.bankCode,
            language: inputValues.language,
            amount: inputValues.amount
        })
        if (res && res.errCode == 200) {
            console.log("orderData", location.orderData)
            localStorage.setItem("orderData", JSON.stringify(location.orderData))

            window.location.href = res.link
        }

    }
    return (

        <>

            <div className="wrap-order">
                <div className="wrap-heading-order">
                    <NavLink to="/" className="navbar-brand logo_h">
                        <img src={logo} alt="" />
                    </NavLink>
                    <span>Thanh toán VNPAY</span>
                </div>

                <div className="wrap-order-item">
                    <section className="cart_area">
                        <div className="container">
                            <div className="cart_inner">
                                <div className="col-md-12">
                                    <div className="p-3 py-5">
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <h4 className="text-right">Thông tin thanh toán</h4>
                                        </div>
                                        <div className="row mt-2">
                                            <div className="col-md-12"><label className="labels">Loại hàng hóa</label><select value={inputValues.orderType} onChange={(event) => handleOnChange(event)} name="orderType" id="inputState" className="form-control">

                                                <option value='billpayment'>Thanh toán hóa đơn</option>
                                            </select></div>
                                        </div>
                                        <div className="row mt-2">
                                            <div className="col-md-12"><label className="labels">Số tiền</label><input name="amount" disabled={true} value={inputValues.amount} onChange={(event) => handleOnChange(event)} type="text" className="form-control" /></div>
                                        </div>
                                        <div className="row mt-2">
                                            <div className="col-md-12"><label className="labels">Nội dung thanh toán</label><input value={inputValues.orderDescription} onChange={(event) => handleOnChange(event)} name="orderDescription" type="text" className="form-control" /></div>
                                        </div>
                                        <div className="row mt-2">
                                            <div className="col-md-12"><label className="labels">Ngân hàng</label><select value={inputValues.bankCode} onChange={(event) => handleOnChange(event)} name="bankCode" id="inputState" className="form-control">

                                                <option value=''>Không chọn</option>
                                                <option value='VNPAYQR'>Ngân hàng VNPAYQR</option>
                                                <option value='NCB'>Ngân hàng NCB</option>
                                                <option value='SCB'>Ngân hàng SCB</option>
                                                <option value='SACOMBANK'>Ngân hàng SACOMBANK</option>
                                                <option value='EXIMBANK'>Ngân hàng EXIMBANK</option>
                                                <option value='MSBANK'>Ngân hàng MSBANK</option>
                                                <option value='NAMABANK'>Ngân hàng NAMABANK</option>
                                                <option value='VISA'>Thẻ VISA</option>
                                                <option value='VNMART'>Ví VNMART</option>
                                                <option value='VIETINBANK'>Ngân hàng VIETINBANK</option>
                                                <option value='VIETCOMBANK'>Ngân hàng VIETCOMBANK</option>
                                                <option value='HDBANK'>Ngân hàng HDBANK</option>
                                                <option value='DONGABANK'>Ngân hàng Đông Á</option>
                                                <option value='TPBANK'>Ngân hàng Tiên Phong</option>
                                                <option value='OJB'>Ngân hàng OceanBank</option>
                                                <option value='BIDV'>Ngân hàng BIDV</option>
                                                <option value='TECHCOMBANK'>Ngân hàng Techcombank</option>
                                                <option value='VPBANK'>Ngân hàng VPBank</option>
                                                <option value='AGRIBANK'>Ngân hàng AGRIBANK</option>
                                                <option value='MBBANK'>Ngân hàng MBBank</option>
                                                <option value='ACB'>Ngân hàng ACB</option>
                                                <option value='OCB'>Ngân hàng OCB</option>
                                                <option value='SHB'>Ngân hàng SHB</option>
                                                <option value='IVB'>Ngân hàng IVB</option>

                                            </select></div>
                                        </div>
                                        <div className="row mt-2">
                                            <div className="col-md-12"><label className="labels">Ngôn ngữ</label><select value={inputValues.language} onChange={(event) => handleOnChange(event)} name="language" id="inputState" className="form-control">

                                                <option value='vn'>Tiếng Việt</option>
                                                <option value='en'>Tiếng Anh</option>


                                            </select></div>
                                        </div>

                                        <div className="mt-3"><button onClick={() => handleOnclick()} className="btn btn-primary profile-button" type="button">Thanh toán ngay</button></div>
                                    </div>
                                </div>
                            </div>



                        </div>


                    </section>
                </div>


            </div>
            <div style={{ width: '100%', height: '100px', backgroundColor: '#f5f5f5' }}></div>
            
            {/* Modal hiển thị QR code */}
            {showQRCode && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 9999
                }} onClick={() => setShowQRCode(false)}>
                    <div style={{
                        backgroundColor: 'white',
                        padding: '30px',
                        borderRadius: '10px',
                        maxWidth: '400px',
                        width: '90%',
                        textAlign: 'center'
                    }} onClick={(e) => e.stopPropagation()}>
                        <h3 style={{ marginBottom: '20px', color: '#333' }}>Quét mã QR để thanh toán</h3>
                        <div style={{
                            backgroundColor: 'white',
                            padding: '20px',
                            borderRadius: '10px',
                            display: 'inline-block',
                            marginBottom: '20px',
                            border: '1px solid #e0e0e0'
                        }}>
                            <QRCodeSVG
                                value={getQRCodeValue()}
                                size={300}
                                level="H"
                                includeMargin={true}
                                style={{
                                    maxWidth: '100%',
                                    height: 'auto'
                                }}
                            />
                        </div>
                        <div style={{ marginTop: '15px' }}>
                            <p style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '5px', color: '#333' }}>{vnpayAccount.name}</p>
                            <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>{vnpayAccount.phone}</p>
                            <p style={{ fontSize: '12px', color: '#999', marginBottom: '20px' }}>
                                Số tiền: {inputValues.amount ? CommonUtils.formatter.format(inputValues.amount) : ''}
                            </p>
                        </div>
                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px' }}>
                            <button 
                                onClick={async () => {
                                    setIsProcessing(true);
                                    try {
                                        let orderData = JSON.parse(localStorage.getItem("orderData"));
                                        if (!orderData) {
                                            toast.error("Không tìm thấy thông tin đơn hàng!");
                                            setIsProcessing(false);
                                            return;
                                        }
                                        
                                        let res = await paymentOrderVnpaySuccessService(orderData);
                                        if (res && res.errCode === 0) {
                                            toast.success("Thanh toán thành công!");
                                            localStorage.removeItem("orderData");
                                            setShowQRCode(false);
                                            
                                            // Chuyển hướng đến trang đơn hàng
                                            const userData = JSON.parse(localStorage.getItem('userData'));
                                            if (userData) {
                                                setTimeout(() => {
                                                    history.push(`/user/order/${userData.id}`);
                                                }, 1500);
                                            }
                                        } else {
                                            toast.error(res.errMessage || "Thanh toán thất bại");
                                            setIsProcessing(false);
                                        }
                                    } catch (error) {
                                        console.error("Error confirming payment:", error);
                                        toast.error("Đã xảy ra lỗi, vui lòng thử lại");
                                        setIsProcessing(false);
                                    }
                                }}
                                disabled={isProcessing}
                                style={{
                                    padding: '10px 30px',
                                    backgroundColor: isProcessing ? '#6c757d' : '#28a745',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: isProcessing ? 'not-allowed' : 'pointer',
                                    fontSize: '14px',
                                    fontWeight: 'bold'
                                }}
                            >
                                {isProcessing ? 'Đang xử lý...' : 'Đã thanh toán'}
                            </button>
                            <button 
                                onClick={() => setShowQRCode(false)}
                                disabled={isProcessing}
                                style={{
                                    padding: '10px 30px',
                                    backgroundColor: isProcessing ? '#6c757d' : '#6c757d',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: isProcessing ? 'not-allowed' : 'pointer',
                                    fontSize: '14px'
                                }}
                            >
                                Đóng
                            </button>
                        </div>
                        <p style={{ fontSize: '12px', color: '#999', marginTop: '15px', fontStyle: 'italic' }}>
                            Sau khi quét QR và thanh toán thành công, vui lòng nhấn nút "Đã thanh toán"
                        </p>
                    </div>
                </div>
            )}
        </>

    );
}

export default VnpayPaymentPage;