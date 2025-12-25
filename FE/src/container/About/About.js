// import React from 'react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import minhphuong from '../../resources/img/Minh-Phuong.webp';
import thuyduong from '../../resources/img/NguyenThuyDuong.webp';
import thuhuong from '../../resources/img/PhungThuHuong.webp';

function About(props) {
  return (
    <>
      <section class="banner_area"
        className="banner_area"
        style={{
          backgroundImage: 'url(/resources/img/Untitled-1.jpg)',  // Đường dẫn tới ảnh nền
          backgroundSize: 'cover',  // Bao phủ toàn bộ phần
          backgroundPosition: 'center',  // Căn giữa ảnh
          backgroundRepeat: 'no-repeat',  // Không lặp lại ảnh
          padding: '80px 0',  // Khoảng cách cho phần này
          zIndex: '5',
        }}
      >
        <div class="banner_inner d-flex align-items-center">
          <div class="container">
            <div class="banner_content d-md-flex justify-content-between align-items-center">
              <div class="mb-3 mb-md-0">
                <h1 style={{ fontSize: '600', textTransform: 'uppercase' }}>Cardina - Thời trang và còn nhiều hơn thế</h1>
              </div>
              <div class="page_link">
                <Link to={"/"}>Trang chủ</Link>
                <Link to={"/about"}>Giới thiệu</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div>
        <div className="container mb-5">
          <div className="row align-items-center">
            <div className="col-12 col-md-6 mb-3">
              <figure style={{ textAlign: 'center' }}>
                <img
                  src={minhphuong}
                  alt="Minh Phuong"
                  style={{ maxWidth: '100%', borderRadius: '10px', width: '400px', height: '400px' }}
                />
                <figcaption style={{ fontStyle: 'italic', marginTop: '8px' }}>
                  <p><b>Nguyễn Thị Minh Phương</b><br /><i>ID: 22k610075</i></p>
                </figcaption>
              </figure>
            </div>
            <div className="col-12 col-md-6">
              <h2>Về chúng tôi</h2>
              <p>Chào mừng đến với Cardina, điểm đến hàng đầu của bạn cho các xu hướng thời trang mới nhất với giá cả phải chăng. Tại Cardina, chúng tôi tin rằng thời trang không chỉ là quần áo - mà còn là cách thể hiện cá tính độc đáo và phong cách riêng mỗi ngày. Sứ mệnh của chúng tôi là cung cấp cho bạn những trang phục thời thượng, chất lượng cao phù hợp với phong cách và ngân sách của bạn, giúp bạn trông đẹp nhất và cảm thấy tự tin mà không tốn kém.</p>
            </div>
            <div className="col-12 col-md-6 mb-3 ">
              <h2>Câu chuyện của chúng tôi</h2>
              Bạn đã bao giờ nhìn vào gương, chọn một bộ trang phục và tự hỏi, "Mình có thực sự trông đẹp và tự tin trong bộ đồ này không?" Đó là lý do Cardina ra đời - một nơi không chỉ bán quần áo mà còn kể câu chuyện về sự tự tin, vẻ đẹp và hành trình khám phá bản thân của mỗi người phụ nữ.
              Tại Cardina, mỗi sản phẩm đều được lựa chọn cẩn thận, từ chất liệu, màu sắc đến thiết kế. Chúng tôi tin rằng trang phục không chỉ là tập hợp những mảnh vải, mà là người bạn đồng hành, là cảm xúc và kỷ niệm mà bạn sẽ mang theo trong hành trình cuộc sống. Mỗi chiếc váy nhẹ nhàng, mỗi chiếc áo khoác ấm áp đều chứa đựng sự tận tâm của đội ngũ chúng tôi.
              Đã có những khách hàng đến với Cardina trong những khoảnh khắc quan trọng nhất của cuộc đời họ: ngày họ có được công việc, buổi hẹn hò đầu tiên, hay ngày họ bước lên sân khấu quan trọng. Sau đó họ quay lại, không chỉ để mua sắm, mà để kể cho chúng tôi câu chuyện của họ - những câu chuyện đã làm chúng tôi xúc động và nhận ra rằng chúng tôi đang làm điều gì đó có ý nghĩa.
              Với Cardina, điều chúng tôi muốn truyền tải không chỉ là quần áo, mà còn là cảm hứng để bạn yêu thương bản thân, tin vào vẻ đẹp của chính mình và bước đi tự tin trên con đường của bạn. Bởi vì chúng tôi hiểu rằng: "Mỗi người phụ nữ đều xứng đáng được yêu thương và tỏa sáng, bắt đầu từ cách họ chọn trang phục cho mình".
              Hãy để Cardina trở thành một phần trong câu chuyện của bạn!
            </div>
            <div className="col-12 col-md-6">
              <figure style={{ textAlign: 'center' }}>
                <img
                  src={thuyduong}
                  alt="Thuy Duong"
                  style={{ maxWidth: '100%', borderRadius: '10px', width: '400px', height: '400px' }}
                />
                <figcaption style={{ fontStyle: 'italic', marginTop: '8px' }}>
                  <p><b>Nguyễn Thùy Dương</b><br /><i>ID: 22k610030</i></p>
                </figcaption>
              </figure>
            </div>
            <div className="col-12 col-md-6 mb-3">
              <figure style={{ textAlign: 'center' }}>
                <img
                  src={thuhuong}
                  alt="Thu Huong"
                  style={{ maxWidth: '100%', borderRadius: '10px', width: '400px', height: '400px' }}
                />
                <figcaption style={{ fontStyle: 'italic', marginTop: '8px' }}>
                  <p><b>Phùng Thu Hương</b><br /><i>ID: 22k610040</i></p>
                </figcaption>
              </figure>
            </div>
            <div className="col-12 col-md-6">
              <h2>Sản phẩm của chúng tôi</h2>
              <p>Từ trang phục thường ngày sang trọng đến trang phục dự tiệc thanh lịch, bộ sưu tập của chúng tôi được thiết kế để đáp ứng mọi nhu cầu thời trang của bạn. Chúng tôi cung cấp đa dạng các loại trang phục dành cho phụ nữ bao gồm váy, áo và quần. Mỗi món đồ đều được lựa chọn cẩn thận để đảm bảo đáp ứng tiêu chuẩn cao về chất lượng và phong cách của chúng tôi.</p>
              <h2>Cam kết của chúng tôi</h2>
              <p>Chúng tôi cam kết liên tục mang đến cho bạn những sản phẩm thời trang tốt nhất và làm cho trải nghiệm mua sắm của bạn trở nên thú vị và thuận tiện. Cảm ơn bạn đã chọn Cardina là điểm đến thời trang của mình. Chúng tôi mong được giúp bạn thể hiện phong cách độc đáo của bạn!</p>
            </div>
            <div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default About;