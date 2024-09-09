import "./Home.css";
import React from "react";

import { RiProfileLine } from "react-icons/ri";
import { ImProfile } from "react-icons/im";
import { ImBlogger2 } from "react-icons/im";
import Search from "../Search/Search";
import Job from "../Job/Job";
import Companies from "../companies/Companies";
const Home = () => {
  return (
    <>
      <Job />
      <div>
        <div className="title-template-cv">
          <span>Mẫu CV JOBLINKER</span> Công cụ kiến tạo CV tối ưu dành cho bạn
          - Tạo CV ngay
        </div>
        <div className="title-tools">
          Công cụ tốt nhất cho hành trang ứng tuyển của bạn
        </div>
        <div className="tools">
          <div className="profile-content">
            <RiProfileLine className="profile-icon" />
            <div className="profile">
              Hồ sơ cá nhân
              <div className="profile-detail">
                Kiến tạo hồ sơ JOBLINKER với cấu trúc chuẩn mực cùng các gợi ý
                chi tiết
              </div>
              <button className="profile-button">Cập nhật hồ sơ</button>
            </div>
          </div>
          <div className="profile-content">
            <ImProfile className="profile-icon" />
            <div className="profile">
              Mẫu CV
              <div className="profile-detail">
                Nâng cấp CV với các mẫu CV chuyên nghiệp - được nhà tuyển dụng
                đề xuất
              </div>
              <button className="profile-button-cv">Xem mẫu CV</button>
            </div>
          </div>
          <div className="profile-content">
            <ImBlogger2 className="profile-icon" />
            <div className="profile">
              Blog
              <div className="profile-detail">
                Cập nhật thông tin lương thưởng, nghề nghiệp và kiến thức
              </div>
              <button className="profile-button">Khám phá blog</button>
            </div>
          </div>
        </div>
        <div className="title-template-cv">
          <span>TOP CÔNG TY</span> Công cụ tìm kiếm công ty dành cho bạn
        </div>

        <div className="companies-top container">
          <Companies />
        </div>
      </div>
    </>
  );
};

export default Home;
