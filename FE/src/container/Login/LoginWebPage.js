import React from "react";
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from "react-router";
import { toast } from 'react-toastify';
import './LoginWebPage.css';
import { FacebookLoginButton, GoogleLoginButton } from "react-social-login-buttons";
import { handleLoginService, checkPhonenumberEmail, createNewUser } from '../../services/userService';
import Otp from "./Otp";
import { authentication } from "../../utils/firebase";
import { signInWithPopup, FacebookAuthProvider, GoogleAuthProvider } from 'firebase/auth'
import { async } from "@firebase/util";
const LoginWebPage = () => {

    const [inputValues, setInputValues] = useState({
        email: '', password: 'passwordsecrect', lastName: '', phonenumber: '', isOpen: false, dataUser: {}
    });
    let history = useHistory();
    const location = useLocation();
    
    useEffect(() => {
        // Kiểm tra URL có tham số form=signup không
        const searchParams = new URLSearchParams(location.search);
        const formType = searchParams.get('form');
        
        if (formType === 'signup') {
            // Hiển thị form đăng ký
            const loginForm = document.querySelector('.login');
            const signupForm = document.querySelector('.signup');
            
            if (loginForm && signupForm) {
                loginForm.classList.add('switched');
                signupForm.classList.remove('switched');
            }
        }
    }, [location]);
    
    useEffect(() => {
        // Thêm mã JavaScript để xử lý chuyển đổi giữa đăng nhập và đăng ký
        const loginBtn = document.querySelector('.CTA .switch[data-form="signup"]');
        const signupBtn = document.querySelector('.CTA .switch[data-form="login"]');
        
        if (loginBtn) {
            loginBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const loginForm = document.querySelector('.login');
                const signupForm = document.querySelector('.signup');
                
                loginForm.classList.add('switched');
                signupForm.classList.remove('switched');
            });
        }
        
        if (signupBtn) {
            signupBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const loginForm = document.querySelector('.login');
                const signupForm = document.querySelector('.signup');
                
                signupForm.classList.add('switched');
                loginForm.classList.remove('switched');
            });
        }
    }, []);
    
    const handleOnChange = event => {
        const { name, value } = event.target;
        setInputValues({ ...inputValues, [name]: value });

    };
    let handleLogin = async () => {
        const element = document.querySelector('form');
        element.addEventListener('submit', event => {
            event.preventDefault();

        });
        let res = await handleLoginService({
            email: inputValues.email,
            password: inputValues.password
        })


        if (res && res.errCode === 0) {


            localStorage.setItem("userData", JSON.stringify(res.user))
            localStorage.setItem("token", JSON.stringify(res.accessToken))
            if (res.user.roleId === "R1" || res.user.roleId === "R4") {
                window.location.href = "/admin"

            }
            else {
                window.location.href = "/"
            }
        }
        else {
            toast.error(res.errMessage)
        }
    }
    let handleLoginSocial = async (email) => {
        const element = document.querySelector('form');
        element.addEventListener('submit', event => {
            event.preventDefault();

        });
        let res = await handleLoginService({
            email: email,
            password: inputValues.password
        })


        if (res && res.errCode === 0) {


            localStorage.setItem("userData", JSON.stringify(res.user))
            localStorage.setItem("token", JSON.stringify(res.accessToken))
            if (res.user.roleId === "R1" || res.user.roleId === "R4") {
                window.location.href = "/admin"

            }
            else {
                window.location.href = "/"
            }
        }
        else {
            toast.error(res.errMessage)
        }
    }

    let handleSaveUser = async () => {
        const element = document.querySelector('form');
        element.addEventListener('submit', event => {
            event.preventDefault();
        });
        
        let res = await checkPhonenumberEmail({
            phonenumber: inputValues.phonenumber,
            email: inputValues.email
        });
        
        if (res.isCheck === true) {
            toast.error(res.errMessage);
        } else {
            let res = await createNewUser({
                email: inputValues.email,
                lastName: inputValues.lastName,
                phonenumber: inputValues.phonenumber,
                password: inputValues.password,
                roleId: 'R2',
            });
                if (res && res.errCode === 0) {
                toast.success("Tạo tài khoản thành công!");
                handleLoginSocial(inputValues.email);  
            } else {
                toast.error(res.errMessage);
            }
        }
    }
    const getBase64FromUrl = async (url) => {

        const data = await fetch(url);
        const blob = await data.blob();
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                const base64data = reader.result;
                resolve(base64data);
            }
        });
    }
    let signInwithFacebook = () => {
        const provider = new FacebookAuthProvider()
        signInWithPopup(authentication, provider)
            .then((re) => {

                LoginWithSocial(re)

            })
            .catch((err) => {
                console.log(err.message)
            })
    }
    let LoginWithSocial = async (re) => {
        let res = await checkPhonenumberEmail({
            phonenumber: re.user.providerData[0].phoneNumber,
            email: re.user.providerData[0].email
        })

        if (res.isCheck === true) {
            setInputValues({
                ...inputValues,
                ["email"]: re.user.providerData[0].email,


            })
            handleLoginSocial(re.user.providerData[0].email)

        } else {
            getBase64FromUrl(re.user.providerData[0].photoURL).then(async (value) => {

                let res = await createNewUser({


                    email: re.user.providerData[0].email,
                    lastName: re.user.providerData[0].displayName,
                    phonenumber: re.user.providerData[0].phoneNumber,
                    avatar: value,
                    roleId: "R2",
                    password: inputValues.password
                })
                if (res && res.errCode === 0) {
                    toast.success("Tạo tài khoản thành công")
                    handleLoginSocial(re.user.providerData[0].email)


                } else {
                    toast.error(res.errMessage)
                }
            })


        }
    }
    let signInwithGoogle = async () => {
        const provider = new GoogleAuthProvider()
        signInWithPopup(authentication, provider)
            .then(async (re) => {

                LoginWithSocial(re)

            })
            .catch((err) => {
                console.log(err.message)
            })
    }

    // Chức năng chuyển đổi form thủ công
    const switchForm = (formName) => {
        const loginForm = document.querySelector('.login');
        const signupForm = document.querySelector('.signup');
        
        if (formName === 'signup') {
            loginForm.classList.add('switched');
            signupForm.classList.remove('switched');
        } else {
            signupForm.classList.add('switched');
            loginForm.classList.remove('switched');
        }
    };

    return (
        <>
            {inputValues.isOpen === false &&
                <div className="box-login">
                    <div className="login-container">
                        <section id="formHolder">
                            <div className="row">
                                {/* Brand Box */}
                                <div className="col-sm-6 brand">
                                    <div className="heading">
                                        <h2 style={{fontFamily:'Script'}}>Cardina</h2>
                                        <p>Thương hiệu thời trang uy tín</p>
                                    </div>
                                    <div className="success-msg">
                                        <p>Tuyệt vời! Bạn đã đăng ký thành công.</p>
                                        <a href="#" className="profile">Tài khoản của bạn</a>
                                    </div>
                                </div>
                                {/* Form Box */}
                                <div className="col-sm-6 form">
                                    {/* Login Form */}
                                    <div className="login form-peice">
                                        <form className="login-form">
                                            <div className="form-group">
                                                <label htmlFor="loginemail">EMAIL</label>
                                                <input onChange={(event) => handleOnChange(event)} type="email" name="email" id="loginemail" required />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="loginpassword">MẬT KHẨU</label>
                                                <input onChange={(event) => handleOnChange(event)} type="password" name="password" id="loginpassword" required />
                                            </div>
                                            <div className="CTA">
                                                <input onClick={() => { handleLogin() }} type="submit" value="GỬI" className="btn-submit" />
                                                <a onClick={() => setInputValues({...inputValues,["isOpen"]:true})} className="switch">Quên mật khẩu</a>
                                            </div>
                                            <div className="form-group mt-4">
                                                <button className="social-btn google-btn" onClick={() => signInwithGoogle()}>
                                                    <img src="https://cdn-icons-png.flaticon.com/128/300/300221.png" width="18" height="18" style={{marginRight: '10px'}} />
                                                    Log in with Google
                                                </button>
                                            </div>
                                            <div className="CTA mt-3">
                                                <a onClick={() => switchForm('signup')} className="switch" data-form="signup">Đăng ký tài khoản mới</a>
                                            </div>
                                        </form>
                                    </div>
                                    {/* End Login Form */}
                                    {/* Signup Form */}
                                    <div className="signup form-peice switched">
                                        <form className="signup-form">
                                            <div className="form-group">
                                                <label htmlFor="name">Họ và tên</label>
                                                <input onChange={(event) => handleOnChange(event)} type="text" name="lastName" id="name" className="name" />
                                                <span className="error" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="email">Email</label>
                                                <input onChange={(event) => handleOnChange(event)} type="email" name="email" id="email" className="email" />
                                                <span className="error" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="phone">Số điện thoại </label>
                                                <input onChange={(event) => handleOnChange(event)} type="text" name="phonenumber" id="phone" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="password">Mật khẩu</label>
                                                <input onChange={(event) => handleOnChange(event)} type="password" name="password" id="password" className="pass" />
                                                <span className="error" />
                                            </div>
                                            
                                            <div className="CTA">
                                                <input onClick={() => handleSaveUser()} type="submit" defaultValue="Signup Now" className="submit" />
                                                <a onClick={() => switchForm('login')} className="switch" data-form="login">Đã có tài khoản</a>
                                            </div>
                                        </form>
                                    </div>
                                    {/* End Signup Form */}
                                </div>
                            </div>
                        </section>

                    </div>
                </div>
            }

            {inputValues.isOpen === true &&
                <Otp isOpenOtp={inputValues.isOpen} setIsOpenOtp={setInputValues} dataUser={inputValues.dataUser}></Otp>
            }
        </>
    )

}
export default LoginWebPage;