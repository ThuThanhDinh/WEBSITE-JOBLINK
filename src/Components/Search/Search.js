import React, { useState } from "react";
import { IoLocationOutline, IoSearch } from "react-icons/io5";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify"; // Thông báo khi tìm kiếm thành công hoặc thất bại
import "./Search.css";

const Search = ({ onSearch }) => {
  // State để lưu trữ các tiêu chí tìm kiếm
  const [city, setCity] = useState(""); // Thành phố
  const [keyword, setKeyword] = useState(""); // Từ khóa tìm kiếm (tên công việc, loại công việc, công ty, level...)

  // Hàm xử lý tìm kiếm
  const handleSearch = () => {
    if (!keyword && !city) {
      toast.error("Vui lòng nhập từ khóa hoặc chọn thành phố!"); // Thông báo nếu chưa nhập tiêu chí
      return;
    }

    // Gửi các dữ liệu tìm kiếm qua prop `onSearch`
    onSearch({ city, keyword });
  };

  return (
    <div className="home-search">
      <div className="introduction-title">
        Có 93.178 bài đăng dành cho bạn ở đây!
      </div>
      <div className="form-search">
        {/* Lựa chọn thành phố */}
        <div className="custom-select">
          <IoLocationOutline className="location-icon" />
          <Form.Select
            aria-label="Chọn thành phố"
            value={city}
            onChange={(e) => setCity(e.target.value)} // Cập nhật state khi người dùng chọn thành phố
          >
            <option value="">Tất cả thành phố</option>
            <option value="Ho Chi Minh">Ho Chi Minh</option>
            <option value="Da Nang">Da Nang</option>
            <option value="Ha Noi">Ha Noi</option>
            <option value="Others">Others</option>
          </Form.Select>
        </div>

        {/* Nhập từ khóa tìm kiếm */}
        <InputGroup className="custom-input-group">
          <Form.Control
            placeholder="Nhập từ khóa theo tên công việc, loại công việc, công ty, level..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)} // Cập nhật state khi người dùng nhập từ khóa
          />
        </InputGroup>

        {/* Nút tìm kiếm */}
        <Button
          variant="primary"
          className="custom-button"
          onClick={handleSearch}
        >
          <IoSearch />
          Search
        </Button>
      </div>
    </div>
  );
};

export default Search;
