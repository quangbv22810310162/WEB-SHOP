import React, { useState, useEffect } from 'react';
import icon1 from '../../resources/img/icon-1.png';


function Footer(props) {
  const [email, setEmail] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!email) {
      alert('Vui lòng nhập địa chỉ email của bạn!');
      return;
    }

    try {
      // Gửi email đăng ký đến server
      const response = await fetch('http://localhost:8003/api/send-newsletter-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        alert('Cảm ơn bạn đã đăng ký!');
        setEmail('');  // Reset email field
      } else {
        alert('Đăng ký không thành công. Vui lòng thử lại sau.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Đã xảy ra lỗi. Vui lòng kiểm tra kết nối và thử lại.');
    }
  };
  useEffect(() => {
    // Thêm script Facebook SDK vào trang
    const script = document.createElement('script');
    script.src = 'https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v21.0&appId=266189382848690';
    script.async = true;
    script.defer = true;
    script.crossOrigin = 'anonymous';
    document.body.appendChild(script);

    script.onload = () => {
      if (window.FB) {
        window.FB.init({
          appId: '266189382848690',
          xfbml: true,
          version: 'v21.0',
        });
      }
    };
  }, []);

  return (

    <div>
      <footer className="footer-area section_gap">
        <div className="container">
          <div className="hotline-phone-ring-wrap">
            <div className="hotline-phone-ring">
              <div className="hotline-phone-ring-circle"></div>
              <div className="hotline-phone-ring-circle-fill"></div>
              <div className="hotline-phone-ring-img-circle">
                <a href="tel:0364256550" className="pps-btn-img">
                  <img
                    width="50"
                    height="50"
                    src={icon1}
                    alt="Số điện thoại"
                  />
                </a>
              </div>
            </div>
            <div className="hotline-bar">
              <a href="tel:036456550">
                <span className="text-hotline">0364256550</span>
              </a>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-3 col-md-6 single-footer-widget">
              <h4>Sản phẩm nổi bật</h4>
              <ul>
                <li><a href="#">Quản lý website</a></li>
                <li><a href="#">Quản lý thương hiệu</a></li>
                <li><a href="#">Công cụ hỗ trợ</a></li>
                <li><a href="#">Dịch vụ marketing</a></li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6 single-footer-widget">
              <h4>Liên kết nhanh</h4>
              <ul>
                <li><a href="http://localhost:5000/">Quang Bùi Shop</a></li>
                <li><a href="http://localhost:5000/shop">Cửa hàng thời trang</a></li>
                <li><a href="http://localhost:5000/contact">Liên hệ</a></li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6 single-footer-widget">
              <h4>Theo dõi Fanpage</h4>
              <div
                className="fb-page"
                data-href="https://www.facebook.com/facebook"
                data-tabs="timeline"
                data-width="300"
                data-height="120"
                data-small-header="false"
                data-adapt-container-width="true"
                data-hide-cover="false"
                data-show-facepile="true"
              >
                <blockquote
                  cite="https://www.facebook.com/facebook"
                  className="fb-xfbml-parse-ignore"
                >
                  <a href="https://www.facebook.com/facebook">Facebook</a>
                </blockquote>

              </div>
            </div>
            <div className="col-lg-3 col-md-6 single-footer-widget">
              <h4>Đăng ký nhận tin</h4>
              <p>Cập nhật thông tin mới nhất từ chúng tôi</p>
              <div className="form-wrap">
                <form className="form-inline" onSubmit={handleSubscribe}>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Địa chỉ email của bạn"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button type="submit" className="click-btn btn btn-default">
                    Đăng ký
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="footer-bottom row align-items-center">
            <p className="footer-text m-0 col-md-12">
              Bản quyền ©20255 Shop quần áo Quang Bùi ♥ Đã đăng ký bản quyền.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
