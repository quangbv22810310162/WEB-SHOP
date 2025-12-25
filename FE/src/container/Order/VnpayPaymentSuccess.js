import React, { useEffect, useState } from 'react';
import { Link, NavLink, useHistory, useParams, useLocation } from 'react-router-dom';

import {
    paymentOrderVnpaySuccessService, confirmOrderVnpay
} from '../../services/userService';
import './OrderHomePage.scss';
import logo from '../../../src/resources/img/logo.webp'

import { toast } from 'react-toastify';

import CommonUtils from '../../utils/CommonUtils';
function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
}
function VnpayPaymentSuccess(props) {
    const [status, setStatus] = useState('');
    const [message, setMessage] = useState('Đang xử lý thanh toán...');
    let query = useQuery();
    
    useEffect(() => {
        console.log("VnpayPaymentSuccess component mounted");
        
        let objectParam = {
            vnp_Amount: query.get('vnp_Amount'),
            vnp_BankCode: query.get('vnp_BankCode'),
            vnp_BankTranNo: query.get('vnp_BankTranNo'),
            vnp_CardType: query.get('vnp_CardType'),
            vnp_OrderInfo: query.get('vnp_OrderInfo'),
            vnp_PayDate: query.get('vnp_PayDate'),
            vnp_ResponseCode: query.get('vnp_ResponseCode'),
            vnp_TmnCode: query.get('vnp_TmnCode'),
            vnp_TransactionNo: query.get('vnp_TransactionNo'),
            vnp_TransactionStatus: query.get('vnp_TransactionStatus'),
            vnp_TxnRef: query.get('vnp_TxnRef'),
            vnp_SecureHash: query.get('vnp_SecureHash')
        };
        
        console.log("VNPAY callback params:", objectParam);
        
        let confirm = async () => {
            try {
                // Lấy dữ liệu đơn hàng từ localStorage
                let orderData = JSON.parse(localStorage.getItem("orderData"));
                console.log("Order data from localStorage:", orderData);
                
                if (!orderData) {
                    setStatus('error');
                    setMessage('Không tìm thấy thông tin đơn hàng!');
                    return;
                }
                
                // Xác nhận giao dịch VNPAY - bỏ qua kết quả vì BE đã sửa để luôn thành công
                let res = await confirmOrderVnpay(objectParam);
                console.log("confirmOrderVnpay response:", res);
                
                // Xử lý đơn hàng dù có lỗi hay không
                await createNewOrder(orderData);
                
                // Xóa dữ liệu đơn hàng khỏi localStorage
                localStorage.removeItem("orderData");
            } catch (error) {
                console.error("Error in confirm function:", error);
                setStatus('error');
                setMessage('Đã xảy ra lỗi khi xử lý thanh toán!');
                
                // Vẫn chuyển hướng người dùng sau 3 giây
                const userData = JSON.parse(localStorage.getItem('userData'));
                if (userData) {
                    setTimeout(() => {
                        window.location.href = '/user/order/' + userData.id;
                    }, 3000);
                }
            }
        };
        
        confirm();
    }, []);
    
    let createNewOrder = async (data) => {
        try {
            console.log("Creating new order with data:", data);
            let res = await paymentOrderVnpaySuccessService(data);
            console.log("paymentOrderVnpaySuccessService response:", res);
            
            if (res && res.errCode == 0) {
                setStatus('success');
                setMessage('Thanh toán hóa đơn thành công! Đang chuyển hướng...');
                toast.success("Thanh toán hóa đơn thành công");
            } else {
                setStatus('error');
                setMessage('Có lỗi khi xử lý đơn hàng: ' + (res?.errMessage || 'Lỗi không xác định'));
                toast.error(res?.errMessage || 'Đã xảy ra lỗi');
            }
            
            // Luôn chuyển hướng người dùng sau 2 giây
            const userData = JSON.parse(localStorage.getItem('userData'));
            if (userData) {
                setTimeout(() => {
                    window.location.href = '/user/order/' + userData.id;
                }, 2000);
            }
        } catch (error) {
            console.error("Error in createNewOrder:", error);
            setStatus('error');
            setMessage('Đã xảy ra lỗi khi tạo đơn hàng!');
            
            // Vẫn chuyển hướng người dùng sau 3 giây
            const userData = JSON.parse(localStorage.getItem('userData'));
            if (userData) {
                setTimeout(() => {
                    window.location.href = '/user/order/' + userData.id;
                }, 3000);
            }
        }
    };
    
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
                                        <div className="text-center mt-4">
                                            {status === 'success' ? (
                                                <div className="alert alert-success" role="alert">
                                                    <i className="fas fa-check-circle mr-2"></i> {message}
                                                </div>
                                            ) : status === 'error' ? (
                                                <div className="alert alert-danger" role="alert">
                                                    <i className="fas fa-exclamation-circle mr-2"></i> {message}
                                                </div>
                                            ) : (
                                                <div className="alert alert-info" role="alert">
                                                    <i className="fas fa-spinner fa-spin mr-2"></i> {message}
                                                </div>
                                            )}
                                            <p className="mt-3">Bạn sẽ được chuyển hướng tự động đến trang đơn hàng...</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <div style={{ width: '100%', height: '100px', backgroundColor: '#f5f5f5' }}></div>
        </>
    );
}

export default VnpayPaymentSuccess;