import React from 'react';
import { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
const SideBar = () => {
    const [user, setUser] = useState({})

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        setUser(userData)
    }, [])
    return (
        <div id="layoutSidenav_nav">
            <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                <div className="sb-sidenav-menu">
                    <div className="nav">
                        <div className="sb-sidenav-menu-heading"></div>
                        <Link to="/" target="_blank" className="nav-link">
                            <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt" /></div>
                            Trang chủ
                        </Link>

                        <div className="sb-sidenav-menu-heading">Quản lý</div>
                        {user && user.roleId === "R1" &&
                            <>
                                <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                                    <div className="sb-nav-link-icon"><i className="fas fa-users"></i></div>
                                    Quản lý người dùng
                                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down" /></div>
                                </a>
                                <div className="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                    <nav className="sb-sidenav-menu-nested nav">
                                        <Link to={'/admin/list-user'} className="nav-link" >Danh sách người dùng</Link>
                                        <Link to={'/admin/add-user'} className="nav-link" >Thêm người dùng</Link>
                                    </nav>
                                </div>
                                <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseCategory" aria-expanded="false" aria-controls="collapseLayouts">
                                    <div className="sb-nav-link-icon"><i className="fas fa-list-ol"></i></div>
                                    Quản lý danh mục
                                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down" /></div>
                                </a>
                                <div className="collapse" id="collapseCategory" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                    <nav className="sb-sidenav-menu-nested nav">
                                        <Link to={'/admin/list-category'} className="nav-link" >Danh sách danh mục</Link>
                                        <Link to={'/admin/add-category'} className="nav-link" >Thêm danh mục</Link>
                                    </nav>
                                </div>
                                <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseBrand" aria-expanded="false" aria-controls="collapseLayouts">
                                    <div className="sb-nav-link-icon"><i className="far fa-copyright"></i></div>
                                    Quản lý thương hiệu
                                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down" /></div>
                                </a>
                                <div className="collapse" id="collapseBrand" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                    <nav className="sb-sidenav-menu-nested nav">
                                        <Link to={'/admin/list-brand'} className="nav-link" >Danh sách thương hiệu</Link>
                                        <Link to={'/admin/add-brand'} className="nav-link" >Thêm thương hiệu</Link>
                                    </nav>
                                </div>
                                <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseProduct" aria-expanded="false" aria-controls="collapseLayouts">
                                    <div className="sb-nav-link-icon"><i class="fa-solid fa-shirt"></i></div>
                                    Quản lý sản phẩm
                                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down" /></div>
                                </a>
                                <div className="collapse" id="collapseProduct" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                    <nav className="sb-sidenav-menu-nested nav">
                                        <Link to={'/admin/list-product'} className="nav-link" >Danh sách sản phẩm</Link>
                                        <Link to={'/admin/add-product'} className="nav-link" >Thêm sản phẩm</Link>
                                    </nav>
                                </div>

                                <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseBanner" aria-expanded="false" aria-controls="collapseLayouts">
                                    <div className="sb-nav-link-icon"><i className="fab fa-adversal"></i></div>
                                    Quản lý banner
                                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down" /></div>
                                </a>
                                <div className="collapse" id="collapseBanner" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                    <nav className="sb-sidenav-menu-nested nav">
                                        <Link to={'/admin/list-banner'} className="nav-link" >Danh sách banner</Link>
                                        <Link to={'/admin/add-banner'} className="nav-link" >Thêm banner</Link>
                                    </nav>
                                </div>
                                <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseShip" aria-expanded="false" aria-controls="collapseLayouts">
                                    <div className="sb-nav-link-icon"><i className="fas fa-shipping-fast"></i></div>
                                    Quản lý vận chuyển
                                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down" /></div>
                                </a>
                                <div className="collapse" id="collapseShip" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                    <nav className="sb-sidenav-menu-nested nav">
                                        <Link to={'/admin/list-typeship'} className="nav-link" >Danh sách loại vận chuyển</Link>
                                        <Link to={'/admin/add-typeship'} className="nav-link" >Thêm loại vận chuyển</Link>
                                    </nav>
                                </div>
                                <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseVoucher" aria-expanded="false" aria-controls="collapseLayouts">
                                    <div className="sb-nav-link-icon"><i className="fas fa-percentage"></i></div>
                                    Quản lý voucher
                                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down" /></div>
                                </a>
                                <div className="collapse" id="collapseVoucher" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                    <nav className="sb-sidenav-menu-nested nav">
                                        <Link to={'/admin/list-typevoucher'} className="nav-link" >Danh sách loại voucher</Link>
                                        <Link to={'/admin/list-voucher'} className="nav-link" >Danh sách mã voucher</Link>
                                        <Link to={'/admin/add-typevoucher'} className="nav-link" >Thêm loại voucher</Link>
                                        <Link to={'/admin/add-voucher'} className="nav-link" >Thêm mã voucher</Link>
                                    </nav>
                                </div>
                            </>
                        }

                        <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseSupplier" aria-expanded="false" aria-controls="collapseLayouts">
                            <div className="sb-nav-link-icon"><i class="fa-solid fa-person-military-pointing"></i></div>
                            Quản lý nhà cung cấp
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down" /></div>
                        </a>
                        <div className="collapse" id="collapseSupplier" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                            <nav className="sb-sidenav-menu-nested nav">
                                <Link to={'/admin/list-supplier'} className="nav-link" >Danh sách nhà cung cấp</Link>
                                <Link to={'/admin/add-supplier'} className="nav-link" >Thêm nhà cung cấp</Link>
                            </nav>
                        </div>
                        <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseReceipt" aria-expanded="false" aria-controls="collapseLayouts">
                            <div className="sb-nav-link-icon"><i class="fa-solid fa-file-import"></i></div>
                            Quản lý nhập hàng
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down" /></div>
                        </a>
                        <div className="collapse" id="collapseReceipt" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                            <nav className="sb-sidenav-menu-nested nav">
                                <Link to={'/admin/list-receipt'} className="nav-link" >Danh sách nhập hàng</Link>
                                <Link to={'/admin/add-receipt'} className="nav-link" >Thêm đơn nhập hàng</Link>
                            </nav>
                        </div>
                        <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseOrder" aria-expanded="false" aria-controls="collapseLayouts">
                            <div className="sb-nav-link-icon"><i className="fas fa-cart-plus"></i></div>
                            Quản lý đơn hàng
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down" /></div>
                        </a>
                        <div className="collapse" id="collapseOrder" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                            <nav className="sb-sidenav-menu-nested nav">
                                <Link to={'/admin/list-order'} className="nav-link" >Danh sách đơn hàng</Link>

                            </nav>
                        </div>
                        <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseMessage" aria-expanded="false" aria-controls="collapseLayouts">
                            <div className="sb-nav-link-icon"><i class="fa-solid fa-message"></i></div>
                            Quản lý tin nhắn
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down" /></div>
                        </a>
                        <div className="collapse" id="collapseMessage" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                            <nav className="sb-sidenav-menu-nested nav">
                                <Link to={'/admin/chat'} className="nav-link" >Tin nhắn</Link>

                            </nav>
                        </div>
                        {user && user.roleId === "R1" &&
                            <>
                                <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseStatistic" aria-expanded="false" aria-controls="collapseLayouts">
                                    <div className="sb-nav-link-icon"><i class="fa-solid fa-magnifying-glass-chart"></i></div>
                                    Thống kê
                                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down" /></div>
                                </a>

                                <div className="collapse" id="collapseStatistic" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                    <nav className="sb-sidenav-menu-nested nav">
                                        <Link to={'/admin/turnover'} className="nav-link" >Thống kê doanh thu</Link>

                                        <Link to={'/admin/profit'} className="nav-link" >Thống kê lợi nhuận</Link>
                                        <Link to={'/admin/stock-product'} className="nav-link" >Thống kê tồn kho</Link>


                                    </nav>
                                </div>
                            </>

                        }


                    </div>
                </div >
                <div className="sb-sidenav-footer">
                   
                Trang quản trị
                </div>
            </nav >
        </div >
    )
}
export default SideBar;