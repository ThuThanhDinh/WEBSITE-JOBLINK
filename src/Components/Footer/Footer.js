import "./Footer.css";
import React from "react";

const Footer = () => {
  return (
    <>
      <div className="footer-content-top">
        <div className="slogan">
          Gọi cho chúng tôi
          <span>123 456 7890</span>
          <span>328 Queensberry Street, North Melbourne VIC 3051, Úc.</span>
          <span>support@Joblinker.com</span>
        </div>

        <div className="about">
          Về chúng tôi
          <span>Liên hệ chúng tôi</span>
          <span>Điều kiện</span>
          <span>Gói hàng</span>
          <span>Liên Hệ</span>
          <span>Câu hỏi thường gặp</span>
        </div>
        <div className="program">
          Dành cho ứng viên
          <span>Duyệt công việc</span>
          <span>Duyệt ứng viên</span>
          <span>Bảng thông tin ứng viên</span>
          <span>Thông báo công việc</span>
          <span>Đánh dấu của tôi</span>
        </div>
        <div className="term">
          Dành cho Nhà tuyển dụng
          <span>Tất cả các nhà tuyển dụng</span>
          <span>Bảng điều khiển của nhà tuyển dụng</span>
          <span>Gói việc làm</span>
        </div>
        <div className="contact">
          Tài nguyên hữu ích
          <span>Sơ đồ trang web</span>
          <span>Điều khoản sử dụng</span>
          <span>Trung tâm bảo mật</span>
          <span>Trung tâm bảo vệ</span>
          <span>Trung tâm bảo vệ Trung tâm trợ năng</span>
        </div>
      </div>
      <div className="footer-content-bottom">Copyright © JOBLINKER</div>
    </>
  );
};

export default Footer;
