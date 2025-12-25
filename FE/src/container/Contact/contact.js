import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Contact/ContactPage.css';

function ContactPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Kiểm tra input hợp lệ
        if (!name || !email || !message) {
            alert("Vui lòng điền đầy đủ thông tin!");
            return;
        }

        try {
            // Gửi dữ liệu form lên server
            const response = await fetch('http://localhost:8003/api/send-contact-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, message })
            });

            if (response.ok) {
                alert('Gửi thành công! Cảm ơn bạn đã liên hệ với chúng tôi.');
                setName('');
                setEmail('');
                setMessage('');
            } else {
                alert('Đã xảy ra lỗi khi gửi yêu cầu. Vui lòng thử lại sau.');
            }
        } catch (error) {
            console.error("Error:", error);
            alert('Đã xảy ra lỗi khi gửi yêu cầu. Vui lòng kiểm tra kết nối và thử lại.');
        }
    };

    return (
        
       <>
       <section class="banner_area"
       className="banner_area"
       style={{
         backgroundImage: 'url(/resources/img/Contact.jpg)',  // Đường dẫn tới ảnh nền
         backgroundSize: 'cover',  // Bao phủ toàn bộ phần
         backgroundPosition: 'center',  // Căn giữa ảnh
         backgroundRepeat: 'no-repeat',  // Không lặp lại ảnh
         padding: '80px 0'  // Khoảng cách cho phần này
       }}
       >
        <div class="banner_inner d-flex align-items-center">
          <div class="container">
            <div class="banner_content d-md-flex justify-content-between align-items-center">
              <div class="mb-3 mb-md-0">
                <h2>Liên Hệ Với Chúng Tôi</h2>
                <p>Chúng tôi luôn sẵn sàng tiếp nhận ý kiến và trả lời các câu hỏi của bạn về sản phẩm và dịch vụ của Công ty. <br></br>Vui lòng liên hệ nếu bạn có bất kỳ yêu cầu hoặc thắc mắc nào.</p>
              </div>
              <div class="page_link">
                <Link to={"/"}>Trang chủ</Link>
                <Link to={"/contact"}>Liên hệ</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
        <section className="contact_area">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <h2>Gửi Yêu Cầu</h2>
                        <p>Cảm ơn bạn đã ghé thăm. Vui lòng điền vào biểu mẫu dưới đây để gửi yêu cầu của bạn. </p>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Họ và tên *</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    placeholder="Nhập họ và tên của bạn"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email *</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="Nhập địa chỉ email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Nội dung *</label>
                                <textarea
                                    className="form-control"
                                    id="message"
                                    placeholder="Nhập nội dung"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">Gửi Yêu Cầu</button>
                        </form>
                    </div>
                    <div className="col-lg-6">
                        <div>
                            <h3>Thông Tin Liên Hệ</h3>
                            <p><i class="fa-solid fa-location-dot"></i> Địa chỉ: <a href="https://www.google.com/maps/place/Tr%C6%B0%E1%BB%9Dng+%C4%90%E1%BA%A1i+h%E1%BB%8Dc+%C4%90i%E1%BB%87n+L%E1%BB%B1c/@21.0465092,105.7806149,17z" target='_blank'>Trường Đại học Điện Lực, 235 Hoàng Quốc Việt, Cổ Nhuế, Bắc Từ Liêm, Hà Nội</a></p>
                            <p><i class="fa-solid fa-mobile-screen-button"></i> Hotline: <a href="tel:+84364256550">0364.256.550</a></p>
                            <p><i class="fa-solid fa-envelope"></i> Email: <a href="mailto:quangvanbui2004@gmail.com">quangvanbui2004@gmail.com</a></p>
                        </div>
                        <div style={{ width: '100%', height: '450px', border: 'none' }}>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.65732569908!2d105.78236867471492!3d21.046392987173753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135abb158a2305d%3A0x5c357d21c785ea3d!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyDEkGnhu4duIEzhu7Fj!5e0!3m2!1svi!2sus!4v1745418876847!5m2!1svi!2sus"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Location Map"
                            />
                        </div>
                    </div>
                </div>
                <br></br>
            </div>
        </section>
        </> 
    );
}

export default ContactPage;
